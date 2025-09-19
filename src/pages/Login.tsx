import { Link } from "react-router-dom";
import { Gmail } from "../components/icons/Gmail";

export default function Login() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center transition duration-300">
      <div className="min-w-lg bg-accent/5 p-6 rounded-xl border-2 border-primary/25">
        <form className="flex flex-col">
          <h1 className="text-4xl font-bold mb-1">Login</h1>
          <p className="mb-4 text-lg text-primary/80">Welcome back!</p>

          <button className="flex items-center justify-center gap-2 text-xl tracking-wide border border-primary font-semibold hover:bg-primary/10 py-2 px-8 rounded-lg">
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
            type="email"
            placeholder="Enter your email"
            className="text-xl py-2 px-4 mb-6 outline-none border border-primary rounded-lg"
          />

          <label htmlFor="pass" className="font-semibold text-2xl mb-1">
            Password
          </label>
          <input
            id="pass"
            type="password"
            placeholder="Enter your password"
            className="text-xl py-2 px-4 mb-6 outline-none border border-primary rounded-lg"
          />

          <button className="flex items-center justify-center gap-2 text-xl tracking-wide bg-primary/90 hover:bg-primary text-bg font-semibold py-2 px-8 rounded-lg">
            Login
          </button>
          <p className="text-center mt-4">
            Do not have an account?
            <Link to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
