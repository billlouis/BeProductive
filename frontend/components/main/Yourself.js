import React, {useState, useEffect} from 'react'
import {StyleSheet,View, Text, Image, FlatList, Button, TouchableOpacity} from 'react-native'
import firebase from 'firebase/compat/app'
import {connect} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { doneTask } from '../../redux/actions'

import 'firebase/compat/firestore';
function yourself(props) {
    const [tasklist, setPosts] = useState([]);

    useEffect(() => {
            props.tasklist.sort(function (x, y) {
                return x.date - y.date;
            })

            // console.log(props.tasklist);
            setPosts(props.tasklist);
            // console.log("update");
    }, [props.tasklist]);


    //on done press
       const onDonePress = (postId,doneval) => {
            // console.log("hello");
            // console.log(postId)
            props.dispatch(doneTask(postId,doneval));
        }

    
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList  
                    numColumns={1}
                    horizontal={false}
                    data={tasklist}
                    renderItem={({ item }) => {
                        // console.log(props,"render addtask");
                        return (
                            <View style={styles.containerImage}>
                                <View style={{flex:3, flexDirection:"column"}}>
                                    <View style={{flex:1, flexDirection:"row", justifyContent:"center"}}>
                                        <Text style={[styles.title, {flex:4}]}>{item.title}</Text>
                                        <View style={{flex:1}}/>
                                        <Text style={[styles.cate, {flex:2}]}>{item.category}</Text>
                                        <View style={{flex:1}}/>
                                    </View>
                                    <View style={[{flex:2} , styles.desc]}><Text style={styles.container}>{item.notes}</Text></View>
                                </View>
                                <View style={{flex:1, justifyContent:"flex-end", marginTop:10}}>
                                    <Text style={[styles.date, {flex:1}]}>{item.date.toLocaleString()}</Text>
                                    <View style={[styles.Icongroup, {marginBottom: 5, marginTop:10}]}>
                                        <TouchableOpacity onPress= {() => onDonePress(item.id,!item.done)} style={styles.Icon}>
                                            <MaterialCommunityIcons name = "check-bold" color="white" size ={20}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress= {() => onDonePress(item.id,!item.done)} style={styles.Icon}>
                                            <MaterialCommunityIcons name = "trash-can" color="white" size ={20}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}}

                />
            </View>
            <TouchableOpacity onPress= {()=>props.navigation.navigate("Addtask")}>
                <MaterialCommunityIcons name = "plus" style = {styles.add} color="white" size ={50}/>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({

    flat:{
        flexDirection:'column',
        alignItems:'center',
    },
    title:{
        fontSize:20,
        //backgroundColor:"blue",
         
        justifyContent:"flex-start",
        alignSelf:"center",
        padding:5,
        textAlign:"left",
        paddingLeft:10,
        paddingRight:10,
    },
    cate:{
        fontSize:8,
        //backgroundColor: "green",
        justifyContent:"center",
        alignSelf:"center",
        paddingRight:10,
        paddingTop:5,
        backgroundColor:"darkgrey",
        color: "white",
        borderColor:"grey",
        borderRadius:20,
        borderWidth:1,
        padding:5,
        textAlign:"center",
        paddingRight:5
    },
    desc:{
        fontSize:8,
        paddingTop:10,
        paddingRight:10,
        justifyContent:"flex-start"
    },
    date:{
        fontSize:12,
        alignSelf:"center",
        justifyContent:"center",
        backgroundColor:"lightgrey",
        borderColor:"grey",
        borderRadius:20,
        borderWidth:1,
        padding:10,
        marginLeft:30,
        bottom:5,
        marginBottom:10,
        width: 100
    },
    Icon:{
        backgroundColor:"#3BE2B0", 
        borderRadius:100, 
        width:35, 
        alignSelf:"center",
        justifyContent:"flex-end",
        padding:7,
        flex:0.35,
        marginBottom:10,
        borderColor:"white",
        borderWidth: 1,
    },
    Icongroup:{
        marginLeft:40,
        
    },
    containerImage: {
        flex: 1 / 3,
        justifyContent:'space-around',
        flexDirection: "row",       
        backgroundColor: "#0F0F0F10",
        borderWidth:1,
        borderRadius:20,
        borderColor: "grey",
        marginBottom:10,
        padding:10,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding:10
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    },
    add: {
        position: 'absolute',
        bottom: 120,
        right: 20,
        backgroundColor: '#3be2b0',
        borderRadius: 100,
        padding: 2,
        paddingLeft:5,
        borderColor:"white",
        borderWidth:1,
    },
})
const mapStateToProps = (store) => ({
    tasklist: store.tasksState.tasklist,
})
export default connect(mapStateToProps)(yourself);