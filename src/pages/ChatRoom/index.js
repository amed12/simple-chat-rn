import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChatItem, Header, InputChat} from '../../component';
import {colors, fonts} from '../../utils';

const ChatRoom = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        text="CS Product A"
        onPress={() => navigation.goBack()}
        type="dark-profile"
      />
      <View style={styles.content }>
        <Text style={styles.chatDate}>ini chatroom</Text>
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </View>
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
