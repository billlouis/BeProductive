import React, {useState, useEffect, useRef} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import 'firebase/compat/firestore';
import { addNotif } from '../../redux/actions'

function Notifz(props){
  const [notifList, setNotifList] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    
    
    setNotifList(props.notifList);
    console.log(notifList)
  },[props.notifList]);
  useEffect(() => {
    if(notifications){
    props.dispatch(addNotif([{message: notifications.request.content.body}]))}
  },[notifications])
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
    console.log(notifList)
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[]);
  return (
    <View style={styles.container}>
            <FlatList 
              numColumns = {1}
              horizontal = {false}
              data= {Array.from(new Set(notifList))}
              renderItem={({item})=>{return(
                <View><Text>{item.message}</Text></View>
              )
              }}
            />
    </View>

)
}
const styles = StyleSheet.create({

  flat:{
      flexDirection:'column',
      alignItems:'center',
  },


  container: {
      flex: 1,
      backgroundColor: 'transparent',
      
  },
  containerInfo: {
      margin: 20
  },
  containerGallery: {
      flex: 1
  },
  containerImage: {
      flex: 1 / 3,
      justifyContent:'space-around',
       borderWidth:1,
       padding:10,

  },
  image: {
      flex: 1,
      aspectRatio: 1 / 1
  },
  add: {
      position: 'absolute',
      bottom: 120,
      right: 20,
      backgroundColor: '#3be2b0',
      borderRadius: 100,
      padding: 2,
      paddingLeft:5,
      borderColor:"white",
      borderWidth:1,
  },
})
const mapStateToProps = (store) => ({
  notifList: store.notifState.notifList,
})
export default connect(mapStateToProps,null)(Notifz);


