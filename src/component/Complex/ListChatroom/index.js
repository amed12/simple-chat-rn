import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';
import {parseISO} from 'date-fns';

const ListChatroom = ({roomData, onPress}) => {
  const getTime = time => {
    time = parseISO(time);
    if (isSameDay(time, new Date())) {
      return format(time, 'HH:mm');
    }
    return format(time, 'dd/MM/yyyy');
  };
  const lastComment = roomData.last_comment_message.startsWith('[file]')
    ? 'File attachment'
    : roomData.last_comment_message;
  const unreadCount = Number(roomData.count_notif);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(roomData.id)}>
      <Image style={styles.avatar} source={{uri: roomData.avatar}} />
      <View style={styles.dataContainer}>
        <View style={styles.content}>
          <Text style={styles.name}>{roomData.name}</Text>
          <Text style={styles.lastMessage}>{lastComment}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.time}>
            {getTime(roomData.last_comment_message_created_at)}
          </Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListChatroom;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    flex: 0,
    flexBasis: 40,
    flexShrink: 0,
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  dataContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  lastMessage: {
    fontSize: 11,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    maxWidth: 175,
  },
  meta: {
    flex: 0,
    flexBasis: 55,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  time: {
    fontSize: 10,
    textAlign: 'right',
    color: colors.timeMessageItem,
  },
  unreadCount: {
    fontSize: 10,
    color: colors.white,
    backgroundColor: colors.unreadButton,
    borderRadius: 50,
    minWidth: 14,
    textAlign: 'center',
    marginTop: 5,
  },
});
