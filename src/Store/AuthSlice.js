import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: false,
  userdata: null,
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userdata = action.payload;
      localStorage.setItem("userdata", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.status = false;
      state.userdata = null;
      localStorage.removeItem("userdata");
    },
    loadUserData: (state) => {
      const userdata = JSON.parse(localStorage.getItem("userdata"));
      if (userdata) {
        state.status = true;
        state.userdata = userdata;
      }
    },
  },
});
export const { login, loadUserData, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
