import type { AppDispatch } from "../features/store";
import { supabase } from "../servies/supabase";

export const loginUser = (email: string, password: string) => async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
};

export const loginUserWithOAuth = () => {
  const res = supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "http://localhost:5173/" },
  });

  return res;
};

export const logoutUser = () => async () => {
  await supabase.auth.signOut();
};

export const incertNewCustomer = async () => {
  // const {data} = await supabase.select()
};
