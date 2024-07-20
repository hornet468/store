import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderAPI } from "../../DAL/api";

const initialState = {
    dataOrder: null,
    loading: false,
    error: null,
};

export const sendOrder = createAsyncThunk(
    "order/sendOrder",
    async (orderInfo, { rejectWithValue }) => {
        const { Name, PhoneNumber } = orderInfo;
        try {
            const response = await orderAPI.sendOrderData(Name, PhoneNumber);
            return response;
        } catch (err) {
            return rejectWithValue("Failed to send order");
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(sendOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.dataOrder = action.payload;
            })
            .addCase(sendOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectOrder = (state) => state.dataOrder;

export default orderSlice.reducer;