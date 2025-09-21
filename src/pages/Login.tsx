import { useState } from "react";

import { Link } from "react-router-dom";
import { Gmail } from "../components/icons/Gmail";

import { loginUser } from "../db/auth";
import { supabase } from "../db/supabase";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="w-full h-[100vh] flex items-center justify-center transition duration-300">
      <div className="min-w-lg bg-accent/5 p-6 rounded-xl border-2 border-primary/25">
        <form className="flex flex-col">
          <h1 className="text-4xl font-bold mb-1">Login</h1>
          <p className="mb-6 text-lg text-primary/80">Welcome back!</p>

          <button
            onClick={(e) => {
              e.preventDefault();
              supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: "http://localhost:5173" },
              });
            }}
            className="flex items-center justify-center gap-2 text-xl tracking-wide border border-primary font-semibold hover:bg-primary/10 py-2 px-8 rounded-lg"
          >
            <Gmail /> Login with gmail
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
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              loginUser(email, password);
            }}
            className="flex items-center justify-center gap-2 text-xl tracking-wide bg-primary/90 hover:bg-primary text-bg font-semibold py-2 mt-2 px-8 rounded-lg"
          >
            Login
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
    </div>
  );
}
