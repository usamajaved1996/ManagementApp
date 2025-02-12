import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
    AddEmployee, GetEmployeeData, GetEmployeeId, GetPayrollList, DeleteEmployee, UpdateEmployee
} from '../services/payRollService';

const initialState = {
    employee: [],
    loading: false,
    error: null,
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
export const deleteEmployee = createAsyncThunk('/payroll/employee/Id', async (data) => {
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
        .addCase(getEmployee.pending, (state) => {
            state.loading = true;
        })
        .addCase(getEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(getEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
});

export default payrollSlice.reducer;