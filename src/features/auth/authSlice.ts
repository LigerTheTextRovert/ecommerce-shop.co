import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type?: string;
  user?: any;
}

interface AuthState {
  isUserAuthenticated: boolean;
  username: string | null;
  session: Session | null;
}
const initialState: AuthState = {
  isUserAuthenticated: false,
  session: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userName: string; session: Session }>,
    ) => {
      state.isUserAuthenticated = true;
      state.username = action.payload.userName;
      state.session = action.payload.session;
    },
    logout: (state) => {
      state.isUserAuthenticated = false;
      state.username = null;
      state.session = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsUserAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isUserAuthenticated;

export const selectUserName = (state: { auth: AuthState }) =>
  state.auth.username;

export default authSlice.reducer;
