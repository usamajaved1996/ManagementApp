import axios from 'axios';
import { BASEURL } from '../constants/api';

export const GetProducts = async () => {
    const url = `${BASEURL}product/getProducts`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const AddProduct = async (data) => {
    const url = `${BASEURL}product/create`;
    try {
        const response = await axios.post(
            url,
            data,
        );
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const GetProductsId = async (params) => {
    const url = `${BASEURL}product/getProducts/${params}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const UpdateProduct = async ( updatePayrollDto) => {
    let id = updatePayrollDto.id
    const url = `${BASEURL}product/getProducts/${id}`;
    try {
        const response = await axios.patch(url, updatePayrollDto);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};
export const DeleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${BASEURL}product/getProducts/${id}`);
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