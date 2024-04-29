import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {},
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    updateCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      localStorage.setItem("userInfo", JSON.stringify(state.currentUser));
    },

    loggingOut(state) {
      state.currentUser = {};
      localStorage.removeItem("userInfo");
    },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
    // setError: (state, action) => {
    //   state.error = action.payload;
    // },
    // clearError: (state) => {
    //   state.error = null;
    // },
  },
});

export const { setCurrentUser, updateCurrentUser, loggingOut } =
  userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectAccessToken = (state) => state.user.currentUser.access;
export const selectLoading = (state) => state.user.status === "loading";
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
