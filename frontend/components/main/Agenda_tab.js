import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//import RNCalendarEvents from 'react-native-calendar-events';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import {connect} from 'react-redux';
import {Agenda} from 'react-native-calendars';
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

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  

  const loadItems = (day) => {

    for (let i = -4; i < 5; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      console.log(day);
      console.log(strTime);
    }
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        //loadItemsForMonth={loadItems}
        selected={(new Date()).toISOString().split('T')[0]}
        renderItem={renderItem}
      />
    </View>
  );
}

const mapStateToProps = (store) => ({
    tasklist: store.tasksState.tasklist,
})
export default connect(mapStateToProps)(Calendarr);