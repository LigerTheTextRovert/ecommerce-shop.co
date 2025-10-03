import type { AppDispatch } from "../features/store";
import { login, logout } from "../features/auth/authSlice";
import { supabase } from "../servies/supabase";

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
          role: "customer",
        }),
      );
    }
  };

export const loginUserWithOAuth = () => {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "http://localhost:5173" },
  });
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await supabase.auth.signOut();
  dispatch(logout());
};

export const incertNewCustomer = async () => {
  // const {data} = await supabase.select()
};
