import React, {useState, useEffect} from 'react'
import {View, Text, FlatList, Button, TextInput, StyleSheet} from 'react-native'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../../redux/actions/index'

function Comments(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }
        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    matchUserToComment(comments)
                })
            setPostId(props.route.params.postId)
        } else {
            matchUserToComment(comments)
        }
    }, [props.route.params.postId, props.users])

    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    return (
        <View>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View style={{paddingVertical:"3", fontSize:'15', paddingLeft:10}}>
                        {item.user !== undefined ?
                            <Text style={styles.username}>
                                {item.user.name}
                            </Text>
                            : null}
                        <Text style={styles.content}>{item.text}</Text>
                    </View>
                )}
            />

            <View>
                <TextInput style={styles.comment}
                    placeholder='comment...'
                    onChangeText={(text) => setText(text)} />
                <Button
                    onPress={() => onCommentSend()}
                    title="Send"
                />
            </View>

        </View>
    )
}

const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comments);

const styles=StyleSheet.create({
    username:{
        flex: 1,
        fontWeight:'bold',
        //padding:5,

    },
    content:{
        //marginTop: 20,
        color:'grey',
       //paddingVertical: 10,
        textAlign: 'left',
 
    },
    comment:{
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        backgroundColor: 'lightgrey',
        paddingLeft:10, 
        paddingBottom:5
    }
})