import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isUserAuthenticated: boolean;
  userName: string | null;
  session: string | null;
}
const initialState: AuthState = {
  isUserAuthenticated: false,
  session: null,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userName: string; session: string }>,
    ) => {
      state.isUserAuthenticated = true;
      state.userName = action.payload.userName;
      state.session = action.payload.session;
    },
    logout: (state) => {
      state.isUserAuthenticated = false;
      state.userName = null;
      state.session = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsUserAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isUserAuthenticated;

export const selectUserName = (state: { auth: AuthState }) =>
  state.auth.userName;

export default authSlice.reducer;
