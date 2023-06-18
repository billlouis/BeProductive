import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//import RNCalendarEvents from 'react-native-calendar-events';

import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import { now } from 'xdate';


export default function Calendarr() {

  const timeToString = (time) => {
    const date = new Date(time);
    //console.log(date.toISOString());
    return date.toISOString().split('T')[0];
  };
  
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150)),
          });
        }
      }
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
        loadItemsForMonth={loadItems}
        selected={(new Date()).toISOString().split('T')[0]}
        renderItem={renderItem}
      />
    </View>
  );
}
