import { createSlice } from "@reduxjs/toolkit";

const initialState = { collegeType: [], universityType: [] , industryType: []};

const typeSlice = createSlice({
    name: "type",
    initialState,
    reducers: {
        setCollegeType(state, action) {
            state.collegeType = action.payload;
        },
        setUniversityType(state, action) {
            state.universityType = action.payload;
        },
        setIndustryType(state, action) {
            state.industryType = action.payload;
        },
    },
});

export const { setCollegeType, setUniversityType, setIndustryType } = typeSlice.actions;

export default typeSlice.reducer;