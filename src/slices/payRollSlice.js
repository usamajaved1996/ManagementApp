import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
    AddEmployee, GetEmployeeData, GetEmployeeId, GetPayrollList, DeleteEmployee, UpdateEmployee
} from '../services/payRollService';

const initialState = {
    user: null,
    status: 'idle',
    error: null, // For handling errors
};

export const addEmployee = createAsyncThunk('/payroll/createEmployee', async (data) => {
    const response = await AddEmployee(data);
    return response;
});
export const getEmployee = createAsyncThunk('/payroll/getEmployee', async (data) => {
    const response = await GetEmployeeData(data);
    return response;
});
export const getEmployeeById = createAsyncThunk('/payroll/getEmployeeById', async (data) => {
    const response = await GetEmployeeId(data);
    return response;
});
export const getPayrollList = createAsyncThunk('/payroll/payroll', async (data) => {
    const response = await GetPayrollList(data);
    return response;
});
export const updateEmployee = createAsyncThunk('/payroll/employee/Id', async (data) => {
    const response = await UpdateEmployee(data);
    return response;
});
export const deleteProduct = createAsyncThunk('/payroll/employee/Id', async (data) => {
    const response = await DeleteEmployee(data);
    return response;
});

export const payrollSlice = createSlice({
    name: 'payroll',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
      
    },
});

export default payrollSlice.reducer;