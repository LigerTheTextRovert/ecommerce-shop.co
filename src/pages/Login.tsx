import { supabase } from "../db/supabase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../features/auth/authSlice";
import type { AppDispatch } from "../features/store";
import { Link } from "react-router-dom";
import { Gmail } from "../components/icons/Gmail";
import Modal from "../components/ui/Modal";
import { loginUserWithOAuth } from "../db/auth";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [modal, setModal] = useState<{
    type: "success" | "failed";
    title: string;
    message: string;
  } | null>(null);

  async function handleLogin(email: string, password: string) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setModal({
        type: "failed",
        title: "Login Failed",
        message: error.message,
      });
      return null;
    }

    setModal({
      type: "success",
      title: "Success",
      message: "Login successful!",
    });
    dispatch(login({ userName: email }));

    navigate("/");

    return data.user;
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center transition duration-300">
      <div className="min-w-lg bg-accent/5 p-6 rounded-xl border-2 border-primary/25">
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email, password);
          }}
        >
          <h1 className="text-4xl font-bold mb-1">Login</h1>
          <p className="mb-6 text-lg text-primary/80">Welcome back!</p>

          <button
            type="button"
            onClick={() => loginUserWithOAuth()}
            className="flex items-center justify-center gap-2 text-xl tracking-wide border border-primary font-semibold hover:bg-primary/10 py-2 px-8 rounded-lg mb-4"
          >
            <Gmail /> Login with Gmail
          </button>

          <div className="flex items-center py-4 w-full">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-3 text-gray-500 font-medium">
              or Login with Email
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <label htmlFor="email" className="font-semibold text-2xl mb-1">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="text-xl py-2 px-4 mb-6 outline-none border border-primary rounded-lg"
            required
          />

          <label htmlFor="pass" className="font-semibold text-2xl mb-1">
            Password
          </label>
          <input
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="text-xl py-2 px-4 mb-6 outline-none border border-primary rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="flex items-center justify-center gap-2 text-xl tracking-wide bg-primary/90 hover:bg-primary text-bg font-semibold py-2 mt-2 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-4 tracking-wide">
            Do not have an account?
            <Link to="/signup" className="font-semibold ml-1 hover:underline">
              Create one
            </Link>
          </p>

          <p className="text-center mt-1 tracking-wide">
            Forgot your password?
            <Link to="/signup" className="font-semibold ml-1 hover:underline">
              Click here
            </Link>
          </p>
        </form>
      </div>

      {modal && (
        <Modal
          type={modal.type}
          title={modal.title}
          message={modal.message}
          delay={5}
        />
      )}
    </div>
  );
}
