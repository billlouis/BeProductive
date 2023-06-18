import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
export default function Notification() {
  return (
    <View>
        <Text style = {styles.text}>Friend requests</Text>
        <Text style = {styles.text}>Friend requests</Text>
        <Text style = {styles.text}>Friend requests</Text>
        <Text style = {styles.text}>Friend requests</Text>
        <Text style = {styles.text}>Friend requests</Text>
        <Text style = {styles.text}>Friend requests</Text>

        
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  }
})
