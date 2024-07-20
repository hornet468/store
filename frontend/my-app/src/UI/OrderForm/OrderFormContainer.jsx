import React from 'react';
import { useDispatch } from 'react-redux';
import OrderForm from './OrderForm';
import { sendOrder } from '../../BLL/slice/order.slice';
import { Navigate } from 'react-router-dom';

const OrderFormContainer = () => {
    const dispatch = useDispatch();

    const handleOrder = async (data) => {
        const value = await dispatch(sendOrder(data));
        if (!value.payload) {
            alert("Failed to send order!");
        }
        return value;
      
    };

    return <OrderForm onSubmit={handleOrder} />;
};

export default OrderFormContainer;