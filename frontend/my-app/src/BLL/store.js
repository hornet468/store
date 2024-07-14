import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../BLL/slice/products.slice";
import basketReducer from "../BLL/slice/basket.slice"
import authReducer from "../BLL/slice/auth.slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer,
    auth: authReducer,
  },
});