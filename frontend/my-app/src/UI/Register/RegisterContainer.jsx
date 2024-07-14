import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectAuth } from '../../BLL/slice/auth.slice';
import Register from './Register';
import { Navigate } from 'react-router-dom';

const RegisterContainer = () => {
    const isAuth = useSelector(selectAuth)
    const dispatch = useDispatch();

    const handleRegister = (data) => {
        dispatch(registerUser(data));
    };

    if(isAuth) {
        return <Navigate to={"/"}/>
    }

    return <Register onSubmit={handleRegister} isAuth={isAuth} />;
};

export default RegisterContainer;