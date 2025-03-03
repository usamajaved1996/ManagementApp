import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
    AddProduct, DeleteProduct, GetProducts, GetProductsId, UpdateProduct, ProductOverview
} from '../services/inventoryService';

const initialState = {
    inventory: [],
    loading: false,
    error: null,
};
export const addProduct = createAsyncThunk(
    '/product/addProduct',
    async (data, { getState }) => {
        const { user } = getState().auth;
        const accessToken = user?.data?.access_token;
        const response = await AddProduct(data, accessToken);
        return response;
    }
);
// export const addProduct = createAsyncThunk('/product/addProduct', async (data) => {
//     const response = await AddProduct(data);
//     return response;
// });
export const getProducts = createAsyncThunk('/product/getProduct', async (data) => {
    const response = await GetProducts(data);
    return response;
});
export const getProductById = createAsyncThunk('/product/getProductById', async (data) => {
    const response = await GetProductsId(data);
    return response;
});
export const updateProduct = createAsyncThunk('/product/updateProduct', async (data) => {
    const response = await UpdateProduct(data);
    return response;
});
export const deleteProduct = createAsyncThunk('/product/deleteProduct', async (data) => {
    const response = await DeleteProduct(data);
    return response;
});
export const productOverview = createAsyncThunk('/product/productOverView', async (data) => {
    const response = await ProductOverview(data);
    return response;
});
const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(addProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.inventory.push(action.payload); // Add new inventory to the state
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error if the API call fails
            })
          
    },
});

export default inventorySlice.reducer;