import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
    LoginService,
} from '../services/inventoryService';

const initialState = {
    user: null,
    status: 'idle',
    error: null, // For handling errors
};

export const login = createAsyncThunk('/auth/signin', async (data) => {
    const response = await LoginService(data);
    return response;
});

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loginStatus = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginStatus = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
    },
});

export default inventorySlice.reducer;