import axios from 'axios';
import { BASEURL } from '../constants/api';

export const GetProducts = async (params) => {
    const url = `${BASEURL}product/getProducts`;
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const AddProduct = async (data) => {
    const url = `${BASEURL}product/create`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const GetProductsId = async (params) => {
    const url = `${BASEURL}product/${id}`;
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const UpdateProduct = async (id, updatePayrollDto) => {
    const url = `${BASEURL}product/${id}`;
    try {
        const response = await axios.patch(url, updatePayrollDto);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};
export const DeleteProduct = async (id) => {
    const url = `${BASEURL}product/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const ProductOverview = async (params) => {
    const url = `${BASEURL}product/getProductsOverview`;
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};