import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/compat/app'
import React from 'react'
import { addNotif } from '../../redux/actions';

export default function notif(props) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notifactions, setNotifications] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  useEffect(()=>{
    setExpoPushToken(firebase.firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .get()
                    .then((snapshot)=>{
                        let token = snapshot._delegate._document.data.value.mapValue.fields.notificationToken.stringValue;
                        setExpoPushToken(token)
                    }))
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    //  props.dispatch(addNotif([{message: notification}]))

    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[]);

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      {/* <Text>Your expo push token: {expoPushToken}</Text> */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
    </View>
  )
}
