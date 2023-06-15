import React, { Component } from 'react'
import {View,Text} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import FeedScreen from './main/feed'
const Tab = createBottomTabNavigator();

export class main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Feed" component={FeedScreen} />
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser},dispatch)

export default connect(mapStateToProps, mapDispatchProps)(main);