import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productsAPI } from "../../DAL/api";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getProducts();
      return response.products;
    } catch (err) {
      return rejectWithValue("Failed to fetch products", err);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "products/fetchOneProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getOneProduct(id);
      return response.product;
    } catch (error) {
      return rejectWithValue("Failed to fetch product");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;                                             