import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser , fetchUserPosts, fetchUserFollowing, clearData} from '../redux/actions/index'
import firebase from 'firebase/compat/app'

import SearchScreen from './main/Search'
import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
//import AddTaskScreen from './main/Addtask';

const EmptyScreen = () =>{
    return(null)
}

const Flex = (navigation) => {
    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: 'column',
            width: 100,
            height: 100,
          },
        ]}>
        <View style={{flex: 1, backgroundColor: 'grey', borderTopLeftRadius: 30, borderTopRightRadius: 30}} />
        <View style={{flex: 10, backgroundColor: 'grey'}} />
        <View style={{flex: 1, backgroundColor: 'grey', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: "center"}}>
          <TouchableOpacity onPress= {()=>navigation.navigate("Friendsdrawer")}>
            <MaterialCommunityIcons name = "arrow-right" color="white" size ={30}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

export default Flex;