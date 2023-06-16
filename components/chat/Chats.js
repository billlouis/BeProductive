import React, { userRef, useState, useEffect} from 'react'
import { useHistory, useNavigate } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from 'firebase/compat/app'
import axios from 'axios';
import { useAuth } from "./AuthContext"

const Chats = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const[loading, setLoading] = useState(true);
    console.log(user);

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
    } 

    useEffect(() => {     
        if(!user){
            navigate("/");
            return;
        }
        axios.get('https://api.chatengine.io/users/me',{
            headers: {
                "project-id": "c12bd3f9-bb17-4cdf-8fcb-688f32c219c7",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then(()=>{
            setLoading(false);
        }).catch(()=> {
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append('username', user.email);
            formdata.append('secret',user.uid);
            axios.post('https://api.chatengine.io/users/',formdata,{headers: {"private-key":"0e59f83b-5842-4313-a77e-f43c20c07a56"}})
           /* getFile(user.photoURL).then((avatar)=>{
                formdata.append('avatar',avatar,avatar.name);
                .then(()=> setLoading(false)).catch((error)=>console.log(error))

            })*/

        })
    },[user, history]);
    if(!user || loading) return 'Loading....'
    return (

        <div className='chats-page'>
            <ChatEngine
                height = "calc(100vh -66px)"
                projectID = "c12bd3f9-bb17-4cdf-8fcb-688f32c219c7"
                userName = {user.email}
                userSecret={user.uid}
            />

        
        </div>
    );
}

export default Chats;