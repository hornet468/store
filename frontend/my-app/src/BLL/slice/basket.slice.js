import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { basketAPI } from "../../DAL/api";

const initialState = {
  basket: [],
  loading: false,
  error: null,
};

export const getBasket = createAsyncThunk(
  "basket/fetchBasket",
  async (_, { rejectWithValue }) => {
    try {
      const response = await basketAPI.getBasket();
      return response.basket;
    } catch (err) {
      return rejectWithValue("Failed to fetch basket", err);
    }
  }
);

export const addProductToBasket = createAsyncThunk(
  "basket/addProductToBasket",
  async (product, { rejectWithValue }) => {
    const { _id, Name, Price } = product;
    try {
      const response = await basketAPI.addProductToBasket(_id, Name, Price);
      return response;
    } catch (err) {
      return rejectWithValue("Failed to add product to basket", err);
    }
  }
);

export const deleteProductFromBasket = createAsyncThunk(
  "basket/deleteProductFromBasket",
  async (IdProduct, { rejectWithValue }) => {
    try {
      const response = await basketAPI.deleteProductWithBasket(IdProduct);
      return IdProduct; 
    } catch (err) {
      return rejectWithValue("Failed to delete product from basket", err);
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.basket = action.payload;
      })
      .addCase(getBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProductToBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.basket.push(action.payload);
      })
      .addCase(addProductToBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductFromBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductFromBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.basket = state.basket.filter(product => product._id !== action.payload); 
      })
      .addCase(deleteProductFromBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectBasket = (state) => state.basket;

export  default basketSlice.reducer;