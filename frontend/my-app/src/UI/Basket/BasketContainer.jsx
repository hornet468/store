import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBasket, selectBasket } from "../../BLL/slice/basket.slice";
import Basket from "./Basket";

const BasketContainer = () => {
  const dispatch = useDispatch();
  const basketState = useSelector(selectBasket);
  console.log(selectBasket);

  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);

  if (!basketState) {
    console.log(basketState);
    return <div>Loading...</div>;
  }

  const { basket, loading, error } = basketState;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!basket || basket.length === 0) {
    return <div>No products in basket</div>;
  }

  return <Basket basket={basket} />;
};

export default BasketContainer;