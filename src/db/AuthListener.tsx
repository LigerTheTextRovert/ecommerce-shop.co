import { useEffect } from "react";
import { supabase } from "./supabase";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1️⃣ Check if there is an existing session on load
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        dispatch(
          login({
            userName:
              data.session.user.user_metadata.full_name ||
              data.session.user.email ||
              "",
            session: {
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
              expires_in: data.session.expires_in,
            },
          }),
        );
      } else {
        dispatch(logout());
      }
    };

    checkSession();

    // 2️⃣ Listen to auth changes (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          dispatch(
            login({
              userName:
                session.user.user_metadata.full_name ||
                session.user.email ||
                "",
              session: {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                expires_in: session.expires_in,
              },
            }),
          );
        } else {
          dispatch(logout());
        }
      },
    );

    return () => subscription.subscription.unsubscribe();
  }, [dispatch]);

  return null;
}

export default AuthListener;
