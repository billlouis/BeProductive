import React, {useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            navigate('/Chats');
        })
    }, [user, navigate]);

    const value = { user };

    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}