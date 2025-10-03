import type { ReactNode } from "react";

interface ButtonProp {
  children: ReactNode;
}

export default function Button({ children }: ButtonProp) {
  return (
    <button className="relative cursor-pointer flex items-center justify-center gap-2 p-3 mx-3 text-lg group hover:bg-muted/40">
      {children}
      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-accent origin-left duration-200 transition-transform scale-x-0 group-hover:scale-x-100"></span>
    </button>
  );
}
