import { useEffect } from "react";
import { supabase } from "./supabase";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1️⃣ Check existing session on mount
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session?.user) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking session:", error);
        dispatch(logout());
      }
    };

    checkSession();

    // 2️⃣ Listen for future auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });

    // 3️⃣ Clean up listener on unmount
    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
}

export default AuthListener;
