import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import debounce from 'lodash.debounce';
import xs from 'xstream';
import * as dateFns from 'date-fns';

import {showSuccess} from '../../utils/Commons';
import {Qiscus} from '../../config';
import EmptyChat from '../../component/Complex/EmptyChat';
import MessageList from '../../component/Complex/MessageList';
import DarkProfile from '../../component/Complex/Header/DarkProfile';
import InputChat from '../../component/Complex/InputChat';

export default class ChatRoom extends React.Component {
  state = {
    room: null,
    messages: {},
    commentSend: '',
    isLoadMoreable: true,
    isOnline: false,
    isTyping: false,
    lastOnline: null,
    typingUsername: null,
  };

  componentDidMount() {
    const roomId = this.props.route.params.roomId;
    if (roomId == null) this.props.navigation.replace('MainApp');
    const subscription1 = Qiscus.isLogin$()
      .take(1)
      .map(() => xs.from(Qiscus.qiscus.getRoomById(roomId)))
      .flatten()
      .subscribe({
        next: room => this.setState({room}),
      });
    const subscription2 = Qiscus.isLogin$()
      .take(1)
      .map(() => xs.from(Qiscus.qiscus.loadComments(roomId)))
      .flatten()
      .subscribe({
        next: messages => {
          const message = messages[0] || {};
          const isLoadMoreable = message.comment_before_id !== 0;
          const formattedMessages = messages.reduce((result, message) => {
            result[message.unique_temp_id] = message;
            return result;
          }, {});
          this.setState({
            messages: formattedMessages,
            isLoadMoreable,
          });
        },
      });

    this.subscription = xs
      .merge(
        Qiscus.newMessage$().map(this._onNewMessage),
        Qiscus.messageRead$().map(this._onMessageRead),
        Qiscus.messageDelivered$().map(this._onMessageDelivered),
        Qiscus.onlinePresence$().map(this._onOnline),
        Qiscus.typing$()
          .filter(it => Number(it.room_id) === this.state.room.id)
          .map(this._onTyping),
      )
      .subscribe({
        next: () => {},
        error: error => console.log('subscription error', error),
      });
  }

  componentWillUnmount() {
    Qiscus.qiscus.exitChatRoom();

    this.subscription && this.subscription.unsubscribe();
  }

  render() {
    const {room, isTyping, isOnline, lastOnline, typingUsername} = this.state;
    const messages = this.messages;
    const roomName = room ? room.name : 'Chat';
    const avatarURL = room ? room.avatar : null;
    const options = room ? room.options : null;

    const showTyping = room != null && !this.isG;

    return (
      <View
        keyboardVerticalOffset={StatusBar.currentHeight}
        behavior="padding"
        enabled>
        <DarkProfile
          title={<Text>{roomName}</Text>}
          onPress={() => this.props.navigation.goBack()}
          chatRoomInfo={{
            title: roomName,
            description: this.isGroup ? this.participants : 'personal room',
            profile: {uri: avatarURL},
          }}
        />

        {messages.length === 0 && <EmptyChat />}
        {messages.length > 0 && (
          <MessageList
            isLoadMoreable={this.state.isLoadMoreable}
            messages={messages}
            scroll={this.state.scroll}
            onLoadMore={this._loadMore}
          />
        )}
        {/* <InputChat
          value={this.state.commentSend}
          onChangeText={value =>
            this.setState({
              commentSend: value,
            })
          }
          onPressButton={this._submitMessage(this.state.commentSend)}
        /> */}
      </View>
    );
  }

  _renderOnlineStatus = () => {
    const {isGroup} = this;
    const {isTyping, isOnline, lastOnline, room} = this.state;
    if (room == null) return;
    if (isGroup || isTyping) return;

    const lastOnlineText = dateFns.isSameDay(lastOnline, new Date())
      ? dateFns.format(lastOnline, 'hh:mm')
      : '';

    return (
      <>
        {isOnline && <Text>Online</Text>}
        {!isOnline && <Text>{lastOnlineText}</Text>}
      </>
    );
  };

  _onTyping = debounce(({username}) => {
    this.setState(
      {
        isTyping: true,
        typingUsername: username,
      },
      () => {
        setTimeout(
          () =>
            this.setState({
              isTyping: false,
              typingUsername: null,
            }),
          850,
        );
      },
    );
  }, 300);
  _onOnline = data => {
    this.setState({
      isOnline: data.isOnline,
      lastOnline: data.lastOnline,
    });
    return ['Online presence', data];
  };
  _onNewMessage = message => {
    this.setState(state => ({
      messages: {
        ...state.messages,
        [message.unique_temp_id]: message,
      },
    }));
    return 'New message';
  };

  _onMessageRead = ({comment}) => {
    showSuccess('message read');
    // const date = new Date(comment.timestamp);
    const results = this.messages
      // .filter(it => new Date(it.timestamp) <= date)
      .filter(it => it.timestamp <= comment.timestamp)
      .map(it => ({...it, status: 'read'}));

    const messages = results.reduce((result, item) => {
      const uniqueId = item.unique_id || item.unique_temp_id;
      result[uniqueId] = item;
      return result;
    }, {});
    this.setState(state => ({
      messages: {
        ...state.messages,
        ...messages,
      },
    }));
    return 'Message read';
  };

  _onMessageDelivered = ({comment}) => {
    showSuccess('message delivered');

    const results = this.messages
      .filter(it => it.timestamp <= comment.timestamp && it.status !== 'read')
      .map(it => ({...it, status: 'delivered'}));

    const messages = results.reduce((result, item) => {
      const uniqueId = item.unique_id || item.unique_temp_id;
      result[uniqueId] = item;
      return result;
    }, {});

    this.setState(state => ({
      messages: {
        ...state.messages,
        ...messages,
      },
    }));
    return 'Message delivered';
  };

  _prepareMessage = message => {
    const date = new Date();
    return {
      id: date.getTime(),
      uniqueId: '' + date.getTime(),
      unique_temp_id: '' + date.getTime(),
      timestamp: date.getTime(),
      type: 'text',
      status: 'sending',
      message: message,
      email: Qiscus.currentUser().email,
    };
  };

  _prepareFileMessage = (message, fileURI) => {
    return {
      ...this._prepareMessage(message),
      type: 'upload',
      fileURI,
    };
  };

  _submitMessage = async text => {
    const message = this._prepareMessage(text);
    await this._addMessage(message, true);
    const resp = await Qiscus.qiscus.sendComment(
      this.state.room.id,
      text,
      message.unique_temp_id,
    );
    this._updateMessage(message, resp);
    showSuccess('Success sending message!');
  };

  _onSelectFile = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      resp => {
        if (resp.didCancel) return console.log('user cancel');
        if (resp.error)
          return console.log('error when getting file', resp.error);

        const message = this._prepareFileMessage('File attachment', resp.uri);
        this._addMessage(message, true)
          .then(() => {
            const name = resp.name;
            const obj = {
              uri: resp.uri,
              type: resp.type,
              name: resp.fileName,
            };

            return Qiscus.qiscus.upload(obj, (error, progress, fileURL) => {
              if (error) return console.log('error when uploading', error);
              if (progress) return console.log(progress.percent);
              if (fileURL != null) {
                const payload = JSON.stringify({
                  type: 'image',
                  content: {
                    url: fileURL,
                    file_name: name,
                    caption: '',
                  },
                });
                Qiscus.qiscus
                  .sendComment(
                    this.state.room.id,
                    message.message,
                    message.uniqueId,
                    'custom', // message type
                    payload,
                  )
                  .then(resp => {});
              }
            });
          })
          .catch(error => {
            console.log('Catch me if you can', error);
          });
      },
    );
  };

  _addMessage = (message, scroll = false) =>
    new Promise(resolve => {
      this.setState(
        state => ({
          messages: {
            ...state.messages,
            [message.unique_temp_id]: message,
          },
          scroll,
        }),
        () => {
          if (scroll === false) return;
          const timeoutId = setTimeout(() => {
            this.setState({scroll: false}, () => {
              clearTimeout(timeoutId);
              resolve();
            });
          }, 400);
        },
      );
    });

  _updateMessage = (message, newMessage) => {
    this.setState(state => ({
      messages: {
        ...state.messages,
        [message.unique_temp_id]: newMessage,
      },
    }));
  };

  _loadMore = () => {
    if (!this.state.isLoadMoreable) return;
    const roomId = this.props.route.params.roomId;
    if (roomId == null) return;

    const lastCommentId = this.messages[0].id;
    showSuccess(`Loading more message ${lastCommentId}`);

    Qiscus.qiscus
      .loadComments(roomId, {last_comment_id: lastCommentId})
      .then(messages => {
        showSuccess('Done loading message');
        const isLoadMoreable = messages[0].comment_before_id !== 0;
        this.setState(state => ({
          messages: {
            ...state.messages,
            ...messages.reduce(
              (result, item) => ((result[item.unique_temp_id] = item), result),
              {},
            ),
          },
          isLoadMoreable,
        }));
      })
      .catch(error => console.log('Error when loading more comment', error));
  };

  _sortMessage = messages =>
    messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  _onToolbarClick = () => {
    const roomId = this.state.room.id;
    this.props.navigation.navigate('RoomInfo', {roomId});
  };

  get isGroup() {
    if (this.state.room == null || this.state.room.room_type == null)
      return false;
    return this.state.room.room_type === 'group';
  }

  get participants() {
    const room = this.state.room;
    if (room == null || room.participants == null) return;
    const limit = 3;
    const overflowCount = room.participants.length - limit;
    const participants = room.participants
      .slice(0, limit)
      .map(it => it.username.split(' ')[0]);
    if (room.participants.length <= limit) return participants.join(', ');
    return participants.concat(`and ${overflowCount} others.`).join(', ');
  }

  get messages() {
    return this._sortMessage(Object.values(this.state.messages));
  }
}
