import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import inventoryReducer from '../slices/inventorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializable state invariant middleware
      immutableCheck: false,     // Disable immutable state invariant middleware
    }),
});

export default store;
