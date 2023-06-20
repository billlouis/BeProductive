import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
//import RNCalendarEvents from 'react-native-calendar-events';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import {connect} from 'react-redux';
import {Agenda, Calendar} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';


function Calendarr(props){

  const [items, setItems] = useState({});

    // useEffect(() => {
    //         props.tasklist.sort(function (x, y) {
    //             return x.date - y.date;
    //         })
    //         //setItems(props.tasklist);
    //         console.log(props.tasklist);
    // }, [props.tasklist]);

  

  const fetchEvents = (day) => {
    // console.log(firebase.auth().currentUser.uid);
    // console.log(new Date(day.dateString));
    //const dayStr=timeToString(day);
    setItems({});
    firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .collection('task')
    .get()
    .then((snapshot)=>{
      var j=0;
      let item=snapshot.docs.map(doc=>{
        const data=doc.data();
        var Ndate=new Date(data.date.seconds*1000).toDateString();
        if(new Date(day.dateString).toDateString() === new Date(Ndate).toDateString()){
          j++;
          return {...data}
        }
      });
      items[new Date(day.dateString).toDateString()] = [];
      for (let i = 0; i < item.length; i++){
        items[new Date(day.dateString).toDateString()].push(
          {
            title: item[i].title,
            notes: item[i].notes
          }
        );
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key]
      })
      setItems(newItems);
      //setItems({titles : item.titles, notes : item.notes});
        // console.log(items); 
      
    })
    // console.log(items);
  };


  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  // const renderItem = (item) => {
  //   // console.log(item);
  //   return (
  //     <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
  //       <Card>
  //         <Card.Content>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               alignItems: 'center',
  //             }}>
  //             <Text>{item.title}</Text>
  //             <Avatar.Text label="J" />
  //           </View>
  //         </Card.Content>
  //       </Card>
  //     </TouchableOpacity>
  //   );
  // }
  console.log(items);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Agenda
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6cdc5',
        selectedDayBackgroundColor: "#3be2b0",
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#3be2b0',
        dayTextColor: '#2dc295',
        textDisabledColor: '#d9eeee'}}
        selected={new Date().toDateString()}
        items={{
          '2023-06-20': [{title: 'Demo 3', notes: 'Presentation day'}, {title: 'Compnet', notes: 'Assignment 3'}],
          '2023-06-23': [{title: 'Going to somewhere', notes: 'To Taipei heheheheh'}]
        }}
        // loadItemsForMonth={fetchEvents}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text>{item.notes}</Text>
          </TouchableOpacity>
        )}
        onDayPress={day => {
          fetchEvents(day);
        }}
      />
    </SafeAreaView>
    
/* <SafeAreaView>
  <Agenda
    selected="2022-12-01"
    items={{
      '2022-12-01': [{name: 'Cycling'}, {name: 'Walking'}, {name: 'Running'}],
      '2022-12-02': [{name: 'Writing'}]
    }}
    renderItem={(item, isFirst) => (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    )}
    onDayPress={day => {
      fetchEvents(day);
    }}
  />
</SafeAreaView> */
  );
}




const mapStateToProps = (store) => ({
    tasklist: store.tasksState.tasklist,
    currentUser: store.userState.currentUser,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  }
});
export default connect(mapStateToProps)(Calendarr);