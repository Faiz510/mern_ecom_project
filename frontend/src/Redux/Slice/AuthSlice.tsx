import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, actions) {
      state.currentUser = actions.payload;
    },
    logoutUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, logoutUser } = AuthSlice.actions;

export default AuthSlice.reducer;
