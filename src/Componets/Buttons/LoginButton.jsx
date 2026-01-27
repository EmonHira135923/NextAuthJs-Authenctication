"use client";
import { signIn } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  return (
    <button
      onClick={() => {
        signIn();
      }}
      className="w-1/2 py-3 px-6 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 transition-all duration-200 border border-blue-500/20"
    >
      Login Now
    </button>
  );
};

export default LoginButton;
