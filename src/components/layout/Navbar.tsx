import { useState } from "react";
import { Link } from "react-router-dom";
import { Login } from "../icons/Login";
import { Cross } from "../icons/Cross";
import { ShoppingBag } from "../icons/ShoppingBag";
import type { RootState } from "../../features/store";
import Button from "../ui/Button";
import Input from "../ui/InputBox";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [alert, setAlert] = useState<boolean>(true);
  const { username, isUserAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <>
      <div
        className={`text-bg bg-primary leading-none flex items-center justify-center gap-2 p-2 ${alert ? "" : "hidden"}`}
      >
        <span>Do not miss our amazing offers!</span>
        <button onClick={() => setAlert(!alert)} className="flex items-center">
          <Cross className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex items-center justify-between py-4 px-10 border-b border-b-accent">
        <h1 className="text-3xl font-black px-3 mx-3">Horae.co</h1>

        <Input />

        <div className="flex items-center ">
          {isUserAuthenticated ? (
            <h1 className="text-lg bg-muted/40 py-2 px-4 rounded-xl">
              Welcome, {username}
            </h1>
          ) : (
            <Button>
              <Link to="/login">Login</Link>
              <Login className="w-6 h-6" />
            </Button>
          )}

          {isUserAuthenticated && (
            <Button>
              Cart
              <ShoppingBag className="w-6 h-6" />
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}
