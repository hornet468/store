import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectAuth } from '../../BLL/slice/auth.slice';
import Login from './Login';
import { Navigate } from 'react-router-dom';

const LoginContainer = () => {
    const isAuth = useSelector(selectAuth)
    const dispatch = useDispatch();

    const handleRegister = async (data) => {
        const value = await dispatch(loginUser(data));
        console.log(value);
        if (!value.payload) {
            alert("Failed to auth!")
        }
        if ("token" in value.payload) {
            window.localStorage.setItem("token", value.payload.token)
        }
    };

    
    if(isAuth) {
        return <Navigate to={"/"}/>
    }

    return <Login onSubmit={handleRegister} isAuth={isAuth} />;
};

export default LoginContainer;