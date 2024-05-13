import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sliceApiHandler } from "../SliceApi";

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const res = await sliceApiHandler({
    method: "POST",
    url: `${import.meta.env.VITE_BASE_URL}/api/v1/user/logout`,
    withCredentials: true,
  });
  return res;
});

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
    clearState(state) {
      state.currentUser = initialState.currentUser;
    },
  },
  extraReducers(builder) {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.currentUser = null;
      AuthSlice.caseReducers.clearState(state);
    });
  },
});

export const { setUser, clearState } = AuthSlice.actions;

export default AuthSlice.reducer;
