import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { supabase } from "../../servies/supabase";
import type { Session, User } from "@supabase/supabase-js";

// --------------------
// State Type
// --------------------
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

// --------------------
// Thunks
// --------------------

// 1️⃣ Initialize Auth State (Check existing session)
export const initializeAuth = createAsyncThunk<
  AuthPayload,
  void,
  { rejectValue: string }
>("auth/initialize", async (_, thunkAPI) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return {
      user: session?.user ?? null,
      session: session,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Failed to initialize auth");
  }
});

// 2️⃣ Login with Credentials
export const loginUserWithCredentials = createAsyncThunk<
  AuthPayload,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginWithCredentials", async ({ email, password }, thunkAPI) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    if (!data.user || !data.session) {
      return thunkAPI.rejectWithValue("Login failed: No user data received");
    }

    return { user: data.user, session: data.session };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Login failed");
  }
});

// 3️⃣ Login with OAuth (Google)
export const loginUserWithOAuth = createAsyncThunk<
  void, // No return type since it redirects
  void,
  { rejectValue: string }
>("auth/loginWithOAuth", async (_, thunkAPI) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    // No return - browser will redirect to OAuth provider
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "OAuth login failed");
  }
});

// 4️⃣ Handle OAuth Callback
export const handleOAuthCallback = createAsyncThunk<
  AuthPayload,
  void,
  { rejectValue: string }
>("auth/handleOAuthCallback", async (_, thunkAPI) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    if (!session) {
      return thunkAPI.rejectWithValue("No session found after OAuth callback");
    }

    return { user: session.user, session };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "OAuth callback failed");
  }
});

// 5️⃣ Sign Up with Credentials
export const signUpUser = createAsyncThunk<
  AuthPayload,
  { email: string; password: string },
  { rejectValue: string }
>("auth/signUp", async ({ email, password }, thunkAPI) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return { user: data.user, session: data.session };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Sign up failed");
  }
});

// 6️⃣ Logout
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Logout failed");
    }
  },
);

// 7️⃣ Reset Password
export const resetPassword = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("auth/resetPassword", async ({ email }, thunkAPI) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || "Password reset failed");
  }
});

// --------------------
// Slice
// --------------------
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
    // Update session (useful for auth state change listeners)
    updateSession: (state, action: PayloadAction<AuthPayload>) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isUserAuthenticated = !!action.payload.user;
    },
  },
  extraReducers: (builder) => {
    // ---------- Pending ----------
    builder.addMatcher(
      (action) =>
        action.type.startsWith("auth/") && action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
        state.error = null;
      },
    );

    // ---------- Fulfilled ----------

    // Common fulfilled handler for auth operations that return user/session
    const handleAuthFulfilled = (
      state: AuthState,
      action: PayloadAction<AuthPayload>,
    ) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isUserAuthenticated = !!action.payload.user;
      state.error = null;
    };

    // Operations that don't return user data immediately
    const handleVoidFulfilled = (state: AuthState) => {
      state.isLoading = false;
      state.error = null;
    };

    builder.addCase(initializeAuth.fulfilled, handleAuthFulfilled);
    builder.addCase(loginUserWithCredentials.fulfilled, handleAuthFulfilled);
    builder.addCase(handleOAuthCallback.fulfilled, handleAuthFulfilled);
    builder.addCase(signUpUser.fulfilled, handleAuthFulfilled);

    // OAuth login - redirects, no immediate user data
    builder.addCase(loginUserWithOAuth.fulfilled, handleVoidFulfilled);

    // Logout - clear user data
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isUserAuthenticated = false;
      state.user = null;
      state.session = null;
      state.isLoading = false;
      state.error = null;
    });

    // Password reset - no state change
    builder.addCase(resetPassword.fulfilled, handleVoidFulfilled);

    // ---------- Rejected ----------
    const handleRejected = (
      state: AuthState,
      action: PayloadAction<string | undefined>,
    ) => {
      state.isLoading = false;
      state.error = action.payload || "Authentication failed";

      // Only clear auth state on certain failures
      // Don't clear on initialize failure to prevent flash of logged-out state
      if (!action.type.includes("initialize")) {
        state.user = null;
        state.session = null;
        state.isUserAuthenticated = false;
      }
    };

    builder.addCase(initializeAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to initialize auth";
      // Don't clear existing auth state on initialize failure
    });

    builder.addCase(loginUserWithCredentials.rejected, handleRejected);
    builder.addCase(loginUserWithOAuth.rejected, handleRejected);
    builder.addCase(handleOAuthCallback.rejected, handleRejected);
    builder.addCase(signUpUser.rejected, handleRejected);
    builder.addCase(logoutUser.rejected, handleRejected);
    builder.addCase(resetPassword.rejected, handleRejected);
  },
});

export const { logout, clearError, updateSession } = authSlice.actions;
export default authSlice.reducer;
