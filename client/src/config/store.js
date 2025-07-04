import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../features/location/locationSlice";
import typeReducer from "../features/type/typeSlice";
import departmentReducer from "../features/department/departmentSlice";
import selectedDataReducer from "../features/selectedData/selectedDataSlice";
import universityReducer from "../features/university/universitySlice";
import authReducer from "../features/other/authSlice";
import fieldReducer from "../features/FieldData/FieldData";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    type: typeReducer,
    department: departmentReducer,
    selectedData: selectedDataReducer,
    university: universityReducer,
    // industry: industryReducer,
    auth: authReducer,
    field: fieldReducer,
  },
});
