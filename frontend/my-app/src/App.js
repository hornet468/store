import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductsContainer from "./UI/Products/ProductsContainer";
import Header from "./UI/Header/Header";
import Sidebar from "./UI/Sidebar/Sidebar";
import ProductDetailsContainer from "./UI/ProductDetails/ProductDetailsContainer";
import BasketContainer from "./UI/Basket/BasketContainer";
import Baner from "./UI/Baner/Baner";
import RegisterContainer from "./UI/Register/RegisterContainer";
import LoginContainer from "./UI/Login/LoginContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAuthMe } from "./BLL/slice/auth.slice";
import { selectAuth } from "./BLL/slice/auth.slice";
import OrderFormContainer from "./UI/OrderForm/OrderFormContainer";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  React.useEffect( () => {
    dispatch(getAuthMe())
  }, [])
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <Sidebar />
      {location.pathname === "/" && <Baner />}
      <Routes>
        <Route path="/" element={<ProductsContainer />} />
        <Route path="/product/:id" element={<ProductDetailsContainer />} />
        <Route path="/basket" element={<BasketContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/order" element={<OrderFormContainer /> }/>
      </Routes>
    </div>
  );
}


export default App;