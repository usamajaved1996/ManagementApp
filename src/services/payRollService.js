import axios from 'axios';
import { BASEURL } from '../constants/api';


export const AddEmployee = async (data) => {
    const url = `${BASEURL}payroll/createEmployee`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const GetEmployeeData = async () => {
    const url = `${BASEURL}payroll/employees`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const GetEmployeeId = async (params) => {
    const url = `${BASEURL}payroll/employee/${params}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const GetPayrollList = async (params) => {
    const url = `${BASEURL}payroll/payroll`;
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const UpdateEmployee = async ( updatePayrollDto) => {
    let id = updatePayrollDto.id;
    const url = `${BASEURL}payroll/employee/${id}`;
    try {
        const response = await axios.patch(url, updatePayrollDto);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};

export const DeleteEmployee = async (id) => {
    const url = `${BASEURL}payroll/employee/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.statusText : error.message);
    }
};
