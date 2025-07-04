import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fieldData: [],
    };

const fieldDataSlice = createSlice({
    name: "fieldData",
    initialState,
    reducers: {
        setFieldData(state, action) {
        state.fieldData = action.payload;
        },
    },
    });

export const { setFieldData } = fieldDataSlice.actions;

export default fieldDataSlice.reducer;
