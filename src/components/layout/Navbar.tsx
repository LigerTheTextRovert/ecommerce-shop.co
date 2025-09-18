import { useState } from "react";
import { Login } from "../icons/Login";
import { Cross } from "../icons/Cross";
import { ShoppingBag } from "../icons/ShoppingBag";
import Button from "../ui/Button";
import Input from "../ui/InputBox";

export default function Navbar() {
  const [alert, setAlert] = useState<boolean>(true);
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
          <Button>
            Login
            <Login className="w-6 h-6" />
          </Button>

          {/* <Button> */}
          {/*   Cart */}
          {/*   <ShoppingBag className="w-6 h-6" /> */}
          {/* </Button> */}
        </div>
      </nav>
    </>
  );
}
