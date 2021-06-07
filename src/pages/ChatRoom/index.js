import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ChatItem, Header, InputChat} from '../../component';
import EmptyChat from '../../component/Complex/EmptyChat';
import {colors, fonts, useForm} from '../../utils';
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
  return (
    <View style={styles.page}>
      <Header
        text="CS Product A"
        onPress={() => navigation.goBack()}
        type="dark-profile"
        chatRoomInfo={{
          title: roomName,
          profile: avatarURL,
        }}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.chatDate}>ini chatroom</Text>
        {/* <ChatItem isMe />
        <ChatItem />
        <ChatItem isMe /> */}
        <EmptyChat />
      </ScrollView>
      <InputChat />
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
