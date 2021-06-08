import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ChatItem, Header, InputChat} from '../../component';
import EmptyChat from '../../component/Complex/EmptyChat';
import {colors, fonts, showError, useForm} from '../../utils';
import xs from 'xstream';
import {Qiscus} from '../../config';

const ChatRoom = ({navigation, route}) => {
  const {roomId} = route.params;
  const [form, setForm] = useForm({
    room: null,
    messages: {},
    isLoadMoreable: true,
    isOnline: false,
    isTyping: false,
    lastOnline: null,
    typingUsername: null,
    participants: '',
    chatContent: '',
  });
  useEffect(() => {
    if (roomId != null) {
      const subscription1 = Qiscus.isLogin$()
        .take(1)
        .map(() => xs.from(Qiscus.qiscus.getRoomById(roomId)))
        .flatten()
        .subscribe({
          next: room => setForm('room', room),
          error: err => {
            console.error('The Stream getroom id gave me an error: ', err);
          },
        });
      // const subscription2 = Qiscus.isLogin$()
      //   .take(1)
      //   .map(() => xs.from(Qiscus.qiscus.loadComments(roomId)))
      //   .flatten()
      //   .subscribe({
      //     next: messages => {
      //       const message = messages[0] || {};
      //       const isLoadMoreable = message.comment_before_id !== 0;
      //       const formattedMessages = messages.reduce(
      //         (result, formattedMessage) => {
      //           result[message.unique_temp_id] = formattedMessage;
      //           return result;
      //         },
      //         {},
      //       );
      //       setForm('messages', formattedMessages);
      //       setForm('isLoadMoreable', isLoadMoreable);
      //     },
      //   });

      // this.subscription = xs
      //   .merge(
      //     Qiscus.newMessage$().map(this._onNewMessage),
      //     Qiscus.messageRead$().map(this._onMessageRead),
      //     Qiscus.messageDelivered$().map(this._onMessageDelivered),
      //     Qiscus.onlinePresence$().map(this._onOnline),
      //     Qiscus.typing$()
      //       .filter(it => Number(it.room_id) === this.state.room.id)
      //       .map(this._onTyping),
      //   )
      //   .subscribe({
      //     next: () => {},
      //     error: error => console.log('subscription error', error),
      //   });
      return () => {
        // Qiscus.qiscus.exitChatRoom();

        subscription1.unsubscribe();
      };
    }
  }, [roomId, setForm]);
  if (roomId == null) {
    return this.props.navigation.replace('MainApp');
  }
  const roomName = form.room ? form.room.name : 'Chat';
  const avatarURL = form.room ? {uri: form.room.avatar} : null;
  const isGroup = form.room?.room_type === 'group';
  if (
    (form.room != null || form.room?.participants != null) &&
    form.participants === ''
  ) {
    const limit = 3;
    const overflowCount = form.room.participants.length - limit;
    const participants = form.room.participants
      .slice(0, limit)
      .map(it => it.username.split(' ')[0]);
    if (form.room.participants.length <= limit) {
      setForm('participants', participants.join(', '));
    }
    setForm(
      'participants',
      participants.concat(`and ${overflowCount} others.`).join(', '),
    );
  }
  const sendMessage = async () => {
    const message = _prepareMessage(form.chatContent);
    // await this._addMessage(message, true);
    const resp = await Qiscus.qiscus.sendComment(
      form.room.id,
      form.chatContent,
      message.unique_temp_id,
    );
    // this._updateMessage(message, resp);
    showError('success send sam');
  };

  const _prepareMessage = message => {
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

  return (
    <View style={styles.page}>
      <Header
        text="CS Product A"
        onPress={() => navigation.goBack()}
        type="dark-profile"
        chatRoomInfo={{
          title: roomName,
          profile: avatarURL,
          description: isGroup ? form.participants : 'personal room',
        }}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>ini chatroom</Text>
          {/* <ChatItem isMe />
        <ChatItem />
        <ChatItem isMe /> */}
          <EmptyChat />
        </ScrollView>
      </View>
      <InputChat
        value={form.chatContent}
        onChangeText={value => setForm('chatContent', value)}
        onPressButton={sendMessage}
      />
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
