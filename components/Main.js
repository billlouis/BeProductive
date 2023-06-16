import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from 'react-router-dom'
import {View,Text} from 'react-native'
import Icon from '@mdi/react'
import { mdiHomeOutline, mdiSetCenter, mdiSolid } from '@mdi/js';
import { mdiBellOutline } from '@mdi/js';
import { mdiCalendarBlankOutline } from '@mdi/js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser , fetchUserPosts, fetchUserFollowing} from '../redux/actions/index'
import firebase from 'firebase/compat/app'
import SearchScreen from './main/Search'
import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import NotifScreen from './main/Notification_tab'
import AgendaScreen from './main/Agenda_tab'
import { shadow } from 'react-native-paper';



const Tab = createBottomTabNavigator();
const EmptyScreen = () =>{
    return(null)
}
export class main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }
    render() {
        return (
            <Tab.Navigator 
                initialRouteName="Feed" 
                labeled = {false} 
                screenOptions={({route}) => ({
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: "#3BE2B0", 
                        width: 230, height: 70,
                        alignSelf: "center",
                        marginBottom: 50,
                        borderRadius: 50, borderColor: "white", borderWidth: 2,
                        shadowColor: "black", shadowRadius: 10, shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.6
                    },  
                     tabBarIcon: () => {
                    let iconName, rn = route.name;

                        if(rn === "Feed") iconName = "home-outline";
                        else if(rn === "Notification") iconName = "bell-outline";
                        else if(rn === "Agenda") iconName = "calendar-outline";
                        else if(rn === "Search") iconName = "magnify";
                        else if(rn === "Profile") iconName = "account-outline";
                        return <MaterialCommunityIcons name = {iconName} color="white" size ={30}/>
                     },
                })}
                
            >
                <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}/>
                <Tab.Screen name="Profile" component={ProfileScreen}
                    listeners={({navigation}) => ({tabPress: event=>{
                        event.preventDefault();
                        navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                        }
                    })}
                />
                <Tab.Screen name="Feed" component={FeedScreen}/>
                <Tab.Screen name="Notification" component={NotifScreen}
                    listeners={({navigation}) => ({tabPress: event=>{
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                />
                <Tab.Screen name="Agenda" component={AgendaScreen}/>

            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing},dispatch)

export default connect(mapStateToProps, mapDispatchProps)(main);