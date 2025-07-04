import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  universityData: [],
  nirfData: [],
  naacData: [],
};

const universitySlice = createSlice({
    name: "university",
    initialState,
    reducers: {
        setUniversityData(state, action) {
        state.universityData = action.payload;
        },
        setNirfData(state, action) {
        state.nirfData = action.payload;
        },
        setNaacData(state, action) {
        state.naacData = action.payload;
        },
    },
    });

export const { setUniversityData,setNaacData,setNirfData } = universitySlice.actions;

export default universitySlice.reducer;
