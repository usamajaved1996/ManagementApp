import axios from 'axios';
import { BASEURL } from '../constants/api';

export const GetProducts = async () => {
    const url = `${BASEURL}product/getProducts`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log('error', error)

        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const AddProduct = async (data) => {
    console.log('data', data)
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
        return response.data.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};


export const UpdateProduct = (data) => {
    let id = data.id;
    console.warn('UpdateProduct', data, id);
    
    return axios
        .patch(`${BASEURL}product/${id}`, data) // Removed the extra period before .then()
        .then(response => response.data)
        .catch(error => {
            console.log('error', error.response);
            if (error?.response?.data) {
                const { status, error: message } = error.response.data;
                console.warn('err', { status, message });
                throw { status, message }; // Throwing an object with status & message
            } else {
                throw { status: 500, message: "Unexpected error occurred." };
            }
        });
};

export const DeleteProduct = (id) => {
    console.warn('DeleteProduct', id,`${BASEURL}product/${id}`);

    return axios
        .delete(`${BASEURL}product/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log('error', error.response);
            if (error?.response?.data) {
                const { status, error: message } = error.response.data;
                console.warn('err', { status, message });
                throw { status, message }; // Throwing an object with status & message
            } else {
                throw { status: 500, message: "Unexpected error occurred." };
            }
        });
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

export const UploadInventoryFile = async (formData) => {
    const url = `${BASEURL}product/addInventoryFile`;
    console.log('Uploading file to:', url);
    console.log('FormData contents:', formData);
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Upload response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Upload error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });
        throw new Error(error.response ? error.response.data?.message || error.response.statusText : error.message);
    }
};