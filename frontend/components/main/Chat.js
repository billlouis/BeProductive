import React, {useState, useEffect, useRef} from 'react'
import {View, Text, TextInput, StyleSheet, FlatList} from 'react-native'
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
  //const scroll = useRef();

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
    setMessage("")
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
    <View>

        <TextInput 
            //scroll = {scroll}
            style = {styles.textentry}
            placeholder='' 
            onChangeText={message => setMessage(message)}
            onSubmitEditing = {() => onEnter()}
        />

        <FlatList 
        horizontal={false}
        data = {messages}
        renderItem={({item}) => (
          <Text style = {styles.text}>{item.text}</Text>
        )}
        />

    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    margin: 20,
    fontSize: 30,
  },
  textentry:{
    height: 50,
    backgroundColor: 'gray',
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 20,
    marginBottom:30,
    padding: 15,

  }

});