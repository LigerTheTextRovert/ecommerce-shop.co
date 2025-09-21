import { useEffect, useState } from "react";
import { Cross } from "../icons/Cross";

interface ModalProps {
  type: "success" | "failed";
  title: string;
  message: string;
  delay?: number;
}

export default function Modal({ type, title, message, delay = 3 }: ModalProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => setIsVisible(false), 300); // match animation duration
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex justify-center">
      <div
        className={`relative w-full max-w-md rounded-lg border p-4 shadow-lg transition-all
        ${type === "success" ? "bg-green-100 border-green-400 text-green-900" : "bg-red-100 border-red-400 text-red-900"}
        ${animateOut ? "animate-[slideUpSmooth_0.3s_ease-in-out]" : "animate-[slideDownSmooth_0.3s_ease-in-out]"}
        `}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setAnimateOut(true);
            setTimeout(() => setIsVisible(false), 300);
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <Cross className="w-5 h-5" />
        </button>

        {/* Title */}
        <h1 className="font-semibold text-lg">{title}</h1>

        {/* Message */}
        <p className="mt-1 text-sm">{message}</p>
      </div>
    </div>
  );
}
