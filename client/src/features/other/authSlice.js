import { createSlice } from "@reduxjs/toolkit";

// Define access levels as numbers
const accessLevels = {
  r: 1,
  "r-w": 2,
  "r-w-u": 3,
  "r-w-u-d": 4,
};

const initialState = {
  userName: "",
  userEmail: "",
  isAuthenticated: false,
  userType: "",
  isLoggedIn: undefined, // Initially undefined to indicate loading state
  userAccess: 0, // Default access level (0 means no access)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);

      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userType = action.payload.userType || user;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
      state.userAccess = accessLevels[action.payload.userAccess];
      localStorage.setItem(
        "authData",
        JSON.stringify({
          isLoggedIn: true,
          userAccess: state.userAccess,
          userType: state.userType,
        })
      );
    },
    clearUser(state) {
      state.userName = "";
      state.userEmail = "";
      state.userType = "";
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      state.userAccess = 0; // Reset access level

      // Remove from localStorage
      localStorage.removeItem("authData");
    },
    loadUser(state) {
      const storedAuthData = localStorage.getItem("authData");
      if (storedAuthData) {
        const parsedData = JSON.parse(storedAuthData);
        state.isLoggedIn = parsedData.isLoggedIn;
        state.userAccess = parsedData.userAccess || 0;
        state.userType = parsedData.userType;
      } else {
        state.isLoggedIn = false;
        state.userAccess = 0;
        state.userType = "";
      }
    },
  },
});

export const { setUser, clearUser, loadUser } = authSlice.actions;

export default authSlice.reducer;
