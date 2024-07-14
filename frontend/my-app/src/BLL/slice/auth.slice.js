import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../DAL/api";


const initialState = {
    data: null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    "register/registerUser",
    async (dataUser, { rejectWithValue }) => {
      const { password, fullName, email } = dataUser;
      try {
        const response = await authAPI.register( password, fullName, email);
        return response;
      } catch (err) {
        return rejectWithValue("Failed to register", err);
      }
    }
  );

  export const loginUser = createAsyncThunk(
    "login/loginUser", 
    async(dataUser, {rejectWithValue}) => {
        const {password, email} = dataUser;
        try {
            const response = await authAPI.login(password, email);
            return response;
        } catch (err) {
            return rejectWithValue("Failed to login", err);
        }
    }
  );

  export const getAuthMe = createAsyncThunk(
    "auth/getAuthMe",
    async (_, {rejectWithValue}) => {
        try {
            const response = await authAPI.getAuthMe();
            return response;
        } catch (err) {
            return rejectWithValue("Failed to get account data")
        }
    }
  );

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        } 
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
        .addCase(getAuthMe.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAuthMe.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(getAuthMe.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export const selectAuth = (state) => state.auth.data;

export default authSlice.reducer;

export const {logout} = authSlice.actions