import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
    LoginService,
    SignUpService,
    ConfirmEmailService,
    ForgotService,
    ResetPassword,
    ResendConfirmationCode
} from '../services/authService';

const initialState = {
    user: null,
    status: 'idle',
    loginStatus: 'idle',
    signUpStatus: 'idle',
    error: null, // For handling errors
};

// Async actions for API calls
export const login = createAsyncThunk('/auth/signin', async (data, { rejectWithValue }) => {
    try {
        const response = await LoginService(data);
        return response;
    } catch (error) {
        console.log('AsyncThunk error:', error);
        return rejectWithValue(error.message || 'Login failed');
    }
});


export const signup = createAsyncThunk('/auth/signup', async (data, { rejectWithValue }) => {
    try {
        const response = await SignUpService(data);
        return response;
    } catch (error) {
        console.log('AsyncThunk error:', error);
        return rejectWithValue(error.message || 'Signup failed');
    }
});

export const confirmEmail = createAsyncThunk('/auth/confirmEmail', async (data, { rejectWithValue }) => {
    try {
        const response = await ConfirmEmailService(data);
        return response;
    } catch (error) {
        return rejectWithValue(error.message || 'Email confirmation failed');
    }
});

export const forgotPassword = createAsyncThunk('/auth/forgotpassword', async (data, { rejectWithValue }) => {
    try {
        const response = await ForgotService(data);
        return response;
    } catch (error) {
        return rejectWithValue(error.message || 'Forgot password request failed');
    }
});

export const resetPassword = createAsyncThunk('/auth/resetpassword', async (data, { rejectWithValue }) => {
    try {
        const response = await ResetPassword(data);
        return response;
    } catch (error) {
        return rejectWithValue(error.message || 'Reset password failed');
    }
});

export const resentCode = createAsyncThunk('/auth/resendConfirmationCode', async (data, { rejectWithValue }) => {
    try {
        const response = await ResendConfirmationCode(data);
        return response;
    } catch (error) {
        return rejectWithValue(error.message || 'Resend confirmation code failed');
    }
});

export const clearUser = createAsyncThunk('/auth/clearUser', async (_, { dispatch }) => {
    dispatch(authSlice.actions.clearUserData());
});

// Save user action
export const saveUser = createAction('auth/saveUser');

// Auth slice
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
                state.error = action.payload;
            })
            .addCase(signup.pending, (state) => {
                state.signUpStatus = 'loading';
                state.error = null;
            })
            .addCase(signup.fulfilled, (state) => {
                state.signUpStatus = 'succeeded';
            })
            .addCase(signup.rejected, (state, action) => {
                state.signUpStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(saveUser, (state, action) => {
                state.user = action.payload;
            })
    },
});

export default authSlice.reducer;
