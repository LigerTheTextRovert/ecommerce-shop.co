import { useState } from "react";
import { Link } from "react-router-dom";
import { Gmail } from "../components/icons/Gmail";
import Modal from "../components/ui/Modal";
import { supabase } from "../db/supabase";

export default function Signup() {
  // Form states
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Modal state
  const [modal, setModal] = useState<{
    type: "success" | "failed";
    title: string;
    message: string;
  } | null>(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Signup function
  async function signUp(email: string, password: string) {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: username },
        emailRedirectTo: "http://localhost:5173/auth/callback",
      },
    });

    setLoading(false);

    if (error) {
      setModal({
        type: "failed",
        title: "Signup Failed",
        message: error.message,
      });
      return null;
    }

    setModal({
      type: "success",
      title: "Success",
      message: "Signup was successful!",
    });
    return data.user;
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center transition duration-300">
      <div className="min-w-lg bg-accent/5 p-6 rounded-xl border-2 border-primary/25">
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            signUp(email, password);
          }}
        >
          <h1 className="text-4xl font-bold mb-1">Sign Up</h1>
          <p className="mb-4 text-lg text-primary/80">Create your account</p>

          {/* Gmail OAuth button */}
          <button
            type="button"
            className="relative flex items-center justify-center gap-2 text-xl tracking-wide border border-primary font-semibold hover:bg-primary/10 py-2 px-8 rounded-lg mb-4"
          >
            <Gmail /> Sign up with Gmail
          </button>

          {/* Divider */}
          <div className="flex items-center py-4 w-full">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-3 text-gray-500 font-medium">
              or Sign up with Email
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {/* Username input */}
          <label htmlFor="username" className="font-semibold text-2xl mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            className="text-xl py-2 px-4 mb-6 outline-none border border-primary rounded-lg"
            required
          />

          {/* Email input */}
          <label htmlFor="email" className="font-semibold text-2xl mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="text-xl py-2 px-4 mb-6 outline-none border border-primary rounded-lg"
            required
          />

          {/* Password input */}
          <label htmlFor="pass" className="font-semibold text-2xl mb-1">
            Password
          </label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="text-xl py-2 px-4 mb-6 outline-none border border-primary rounded-lg"
            required
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !username || !email || !password}
            className="flex items-center justify-center gap-2 text-xl tracking-wide bg-primary/90 hover:bg-primary text-bg font-semibold py-2 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Modal */}
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
