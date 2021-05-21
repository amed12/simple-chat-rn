import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICDummyCS} from '../../assets';
import {ListChatroom} from '../../component';
import {colors, fonts} from '../../utils';

const Messages = () => {
  const [messages] = useState([
    {
      id: 1,
      profile: ICDummyCS,
      name: 'Rizal',
      lastMessage: 'terima kasih telah menghubungi kami',
    },
    {
      id: 2,
      profile: ICDummyCS,
      name: 'Ramli',
      lastMessage: 'terima kasih telah menghubungi kami',
    },
    {
      id: 3,
      profile: ICDummyCS,
      name: 'Ridho',
      lastMessage: 'terima kasih telah menghubungi kami',
    },
  ]);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {messages.map(message => {
          return (
            <ListChatroom
              key={message.id}
              profile={message.profile}
              name={message.name}
              lastMessage={message.lastMessage}
            />
          );
        })}
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
