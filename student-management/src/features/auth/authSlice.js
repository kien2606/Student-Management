import { createSlice } from "@reduxjs/toolkit";

const authState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    login(state, action) {
      state.logging = true;
    },
    loginSuccess(state, action) {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loginFaile(state, action) {
      state.logging = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// actions

export const { login, loginSuccess, loginFaile, logout } = authSlice.actions;
// --> to connect : authActions.action

//selector

export const selectAuth = (state) => state.auth;

//reducer

const authReducer = authSlice.reducer;
export default authReducer;
