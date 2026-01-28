"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButton = () => {
  const { status } = useSession();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md mx-auto p-4">
      {status === "authenticated" ? (
        /* --- Logout Button (Rose to Red Gradient) --- */
        <button
          onClick={() => signOut()}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-200 hover:shadow-red-300 hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Log Out
        </button>
      ) : (
        <>
          {/* --- Login Button (Indigo to Violet Gradient) ---  */}
          <button
            onClick={() => signIn()}
            className="w-full sm:w-1/2 py-3.5 px-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Login
          </button>
          {/* --- Register Button (Emerald to Teal Gradient) ---  */}
          <Link
            href="/reg"
            className="w-full sm:w-1/2 py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:brightness-110 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-white/20 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButton;
