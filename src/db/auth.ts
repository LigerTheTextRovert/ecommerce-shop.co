import type { AppDispatch } from "../features/store";
import { login, logout } from "../features/auth/authSlice";
import { supabase } from "../db/supabase";

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    if (data.user && data.session) {
      dispatch(
        login({
          userName: data.user.email ?? "Unknown",
          session: data.session,
        }),
      );
    }
  };

export const signupUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    // Optional: auto-login after signup
    if (data.user && data.session) {
      dispatch(
        login({
          userName: data.user.email ?? "Unknown",
          session: data.session.access_token,
        }),
      );
    }
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await supabase.auth.signOut();
  dispatch(logout());
};
