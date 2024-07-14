import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";
import productsReducer from "./productReducer";
import basketReducer from "./basketReducer";

let reducers = combineReducers({
  productsPage: productsReducer,
  basketPage: basketReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;