"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function Button({ children }) {
  const { pending } = useFormStatus();

  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? (
        <span className="[&>div]:border-primary-950 [&>div]:border-r-transparent">
          <SpinnerMini />
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
