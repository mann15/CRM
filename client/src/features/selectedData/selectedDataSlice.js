import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedData: [],
  selectedDepartmentData: [],
  selectedCourseData: [],
  selectedEmployeeData: [],
};

const selectedDataSlice = createSlice({
  name: "selectedData",
  initialState,
  reducers: {
    setSelectedData(state, action) {
      state.selectedData = action.payload;
    },
    setSelectedDepartmentData(state, action) {
      state.selectedDepartmentData = action.payload;
    },
    setSelectedCourseData(state, action) {
      state.selectedCourseData = action.payload;
    },
    setSelectedEmployeeData(state, action) {
      state.selectedEmployeeData = action.payload;
    },
  },
});

export const {
  setSelectedData,
  setSelectedDepartmentData,
  setSelectedCourseData,
  setSelectedEmployeeData,
} = selectedDataSlice.actions;

export default selectedDataSlice.reducer;
