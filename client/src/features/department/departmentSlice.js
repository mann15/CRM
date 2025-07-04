import { createSlice } from "@reduxjs/toolkit";

const initialState = { department: [] };

const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setDepartment(state, action) {
            state.department = action.payload;
        },
    },
});

export const { setDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;
