import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { supabase } from "../../servies/supabase";
import type { Session, User } from "@supabase/supabase-js";
import { PawPrint } from "lucide-react";

// State Type

interface AuthState {
  isUserAuthenticated: boolean | null;
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isUserAuthenticated: null,
  user: null,
  session: null,
  isLoading: false,
  error: null,
};

// Common Auth Payload
type AuthPayload = {
  user: User | null;
  session: Session | null;
};

export const loginWithCredentials = createAsyncThunk<
  AuthPayload,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginWithCredentials", async ({ email, password }, ThunkAPI) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return ThunkAPI.rejectWithValue(
      error.message || "There was a problem with login",
    );
  }

  return { user: data.user, session: data.session };
});

export const signupWithCredentials = createAsyncThunk<
  AuthPayload,
  { username: string; password: string; email: string },
  { rejectValue: string }
>(
  "auth/signupWithCredentials",
  async ({ username, password, email }, thunkAPI) => {
    try {
      // Optional: Add client-side validation
      if (username.length < 3) {
        return thunkAPI.rejectWithValue(
          "Username must be at least 3 characters",
        );
      }

      if (password.length < 6) {
        return thunkAPI.rejectWithValue(
          "Password must be at least 6 characters",
        );
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return thunkAPI.rejectWithValue(
          error.message || "There was a problem with registration",
        );
      }

      // Success - user might need email confirmation
      return {
        user: data.user,
        session: data.session,
      };
    } catch (err: any) {
      // Catch any unexpected errors
      return thunkAPI.rejectWithValue(
        err.message || "An unexpected error occurred during registration",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Sync logout for immediate UI update
    logout: (state) => {
      state.isUserAuthenticated = false;
      state.user = null;
      state.session = null;
      state.isLoading = false;
      state.error = null;
    },
    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: () => {},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
