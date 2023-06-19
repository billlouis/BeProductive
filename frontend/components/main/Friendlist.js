import React, { Component } from 'react'
import {Modal, Dimensions, TouchableWithoutFeedback, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import SearchScreen from './Search'
import FeedScreen from './Feed'
import ProfileScreen from './Profile'
import YourselfScreen from './Yourself'
import { FlatList } from 'react-native-gesture-handler'
import firebase from 'firebase/compat/app'


const deviceHeight = Dimensions.get("window").height

export class Friendlist extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            image: "",
        }
    }

    show = ()=>{
        this.setState({show: true})
    }

    close = ()=>{
        this.setState({show: false})
    }

    renderOusideTouchable(OnTouch){
        const view = <View style={{flex:1, width:"auto"}}/>
        if(!OnTouch) return view

        return(
            <TouchableWithoutFeedback onPress={OnTouch} style={{flex:1, width:"auto"}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return(
            <View>
                <Text style={{
                    color:"#182E44",
                    fontSize:20,
                    margin:15
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        return(
            <View>
            <FlatList 
                style={{marginBottom:20}}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={this.renderItem}
                extraData={data}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                contentContainerStyle={{
                    paddingBottom: 40
                }}
            />
            </View>
        )
    }

    renderItem = ({item}) => {
        return(
            <View style={{flex:2.3}}>
                <Text>{item.name}</Text>
            </View>
        )
    }

    renderSeparator = () => {
        <View style={{
            flex:1,
            opacity: 0.1,
            backgroundColor: "#182E44",
            height: 1
        }}></View>
    } 

    render(){
        let {show} = this.state
        const {onTouchOutside, title} = this.props
        const {navigation} = this.props
        {() => this.getimage()}
        return(
            <View>
                <Modal 
                    animationType='fade'
                    transparent={true}
                    visible={show}
                    onRequestClose={this.close}
                >
                    <View style={{flex:1, backgroundColor:"#00000090", justifyContent: "flex-end"}}>
                        {this.renderOusideTouchable(onTouchOutside)}
                        <View style={styles.primary_popup}>
                            <View style={styles.top}>
                                <TouchableOpacity component = {ProfileScreen} onPress= {()=>navigation.navigate("Profile",{uid: firebase.auth().currentUser.uid})}
                                    style = {styles.accountIcon}>
                                        <Image style={{flex:1, aspectRatio: 1/1, borderRadius:50}}source={{uri: this.props.data.image}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 14}}>
                                <View style={styles.middle}>
                                    <View style={{flex: 10}}/>
                                    <View style={styles.addIcon}>
                                    <TouchableOpacity onPress= {()=>{navigation.navigate("Search"),this.close()}}>
                                        <MaterialCommunityIcons name = "account-multiple-plus-outline" color="white" size ={25}/>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.bottom}>
                                <TouchableOpacity onPress= {this.close}>
                                    <MaterialCommunityIcons name = "arrow-left" color="white" size ={30}/>
                                </TouchableOpacity>
                            </View>
                            {/* {this.renderContent()} */}
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    primary_popup: {
        backgroundColor: "#A3A3A3", 
        borderColor: "#6B6B6B",
        borderWidth:1,
        width: "auto",
        height: "92%",
        marginLeft: 10,
        marginRight: 80, 
        marginBottom: 40,
        borderRadius: 20, 
        flexDirection: "column"
    },
    top:{
        flex:2.3,  
    },
    middle:{
        flex:1, 
        borderRadius: 20, 
        backgroundColor: "lightgrey", 
        marginLeft:20, 
        marginRight:20, 
        marginTop:10, 
        marginBottom:0,
        alignItems:"flex-start",
        flexDirection: "column"
    },
    bottom:{
        flex: 1,  
        borderBottomLeftRadius: 150, 
        borderBottomRightRadius: 150, 
        alignItems: "flex-end", 
        marginTop: 10,
        marginRight: 10
    },
    accountIcon:{
        borderRadius: 100, 
        backgroundColor:'red', 
        width:40, height:40, 
        alignSelf: 'center', 
        marginTop:10
    },
    addIcon:{
        backgroundColor:"#3BE2B0", 
        borderRadius:100, 
        width:48, 
        alignSelf:"center",
        padding:10,
        paddingBottom:15,
        flex:0.35,
        marginBottom:10,
        marginRight:10,
        borderColor:"white",
        alignSelf:"flex-end",
        borderWidth: 1
    }
})
export default Friendlist;