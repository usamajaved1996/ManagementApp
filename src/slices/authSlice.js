import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
    LoginService,
    SignUpService,

} from '../services/authService';

const initialState = {
    user: null,
    status: 'idle',
    loginStatus: 'idle',
    signUpStatus: 'idle',

    error: null, // For handling errors
};

export const login = createAsyncThunk('/users/signin', async (data) => {
    const response = await LoginService(data);
    return response;
});

export const signup = createAsyncThunk('/users/signup', async (data) => {
    const response = await SignUpService(data);
    return response;
});
// export const forgotPassword = createAsyncThunk('/users/forgotpassword', async (data) => {
//     const response = await ForgotService(data);
//     return response;
// });

export const clearUser = createAsyncThunk('/auth/clearUser', async (_, { dispatch }) => {
    dispatch(authSlice.actions.clearUserData());
});
export const saveUser = createAction('auth/saveUser');

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }

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
            .addCase(signup.pending, (state) => {
                state.signUpStatus = 'loading';
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.signUpStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.signUpStatus = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(saveUser, (state, action) => {
                state.user = action.payload;
            });

    },
});

export default authSlice.reducer;