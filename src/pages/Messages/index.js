import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import xs from 'xstream';
import {ListChatroom} from '../../component';
import {Qiscus} from '../../config';
import {colors, fonts} from '../../utils';

const Messages = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const subscription = Qiscus.isLogin$()
      .filter(isLogin => isLogin === true)
      .take(1)
      .map(() => xs.from(Qiscus.qiscus.loadRoomList()))
      .flatten()
      .subscribe({
        next: rooms => {
          setMessages(rooms);
          console.log(rooms);
          subscription.unsubscribe();
        },
        error: err => {
          console.error('The Stream load room list gave me an error: ', err);
        },
      });
    this.subscription = Qiscus.newMessage$().subscribe({
      next: message => {
        onNewMessage(message);
      },
    });
    const onNewMessage = message => {
      const roomId = message.room_id;
      const room = messages.find(r => r.id === roomId);
      if (room == null) {
        return;
      }
      room.count_notif = (Number(room.count_notif) || 0) + 1;
      room.last_comment_message = message.message;

      const rooms = messages.filter(r => r.id !== roomId);
      setMessages([room, ...rooms]);
      return `Success updating room ${room.id}`;
    };
    return () => subscription.unsubscribe();
  }, [messages]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        <FlatList
          data={messages}
          keyExtractor={it => `key-${it.id}`}
          renderItem={({item}) => (
            <ListChatroom
              roomData={item}
              onPress={roomId =>
                navigation.push('ChatRoom', {
                  roomId,
                })
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default Messages;
const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
