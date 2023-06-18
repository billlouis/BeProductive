import React, {useState, useEffect, useRef} from 'react'
import {View, Text, TextInput, StyleSheet, FlatList, Keyboard, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import { addDoc, collection, serverTimestamp, query,
  orderBy,
  onSnapshot,
  limit, } from "firebase/firestore";
//I thought that we'd use the two below, theyre just for push notifications apparently
//import messaging from '@react-native-firebase/messaging';

export default function Chat(){

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const onEnter = async () => {

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const {uid, displayName, email} = firebase.auth().currentUser;
   
    await addDoc(collection(firebase.firestore(),"messages"), {
      text: message,
      name: displayName,
      email: email,
      createdAt: serverTimestamp(),
    });
    setMessage('')
    //scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const q = query(
      collection(firebase.firestore(),"messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <View style = {{flexDirection: 'column', flex: 1}}>
      {/* <KeyboardAvoidingView behavior='padding'> */}

        <FlatList 
        horizontal={false}
        data = {messages}
        renderItem={({item}) => (
          
          item.email == firebase.auth().currentUser.email ? 
          <Text style = {styles.text}>{item.text}</Text> :
          <Text style = {styles.textright}>{item.text}</Text>
                  
        )}
        />
       {/* </KeyboardAvoidingView> */}

        <TextInput 
            ref = {(message) => message}
            value = {message}
            scroll = {scroll}
            style = {styles.textentry}
            placeholder='Aa' 
            onChangeText={message => setMessage(message)}
            onSubmitEditing = {() => onEnter()}
        />

    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    backgroundColor: 'grey',
    borderRadius: 40,
    paddingVertical:10,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
    textAlign: 'right',
    margin: 5,
    marginRight: 15,
    fontSize: 15,
  },
  textentry:{
    //position: 'fixed',
    //bottom: 10,
    //height: 50,
    backgroundColor: 'gray',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 20,
    marginVertical:10,
    padding: 15,
  },
  textright:{
    backgroundColor: 'grey',
    borderRadius: 40,
    paddingVertical:10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    textAlign: 'right',
    margin: 5,
    marginRight: 15,
    fontSize: 15,
  }

});