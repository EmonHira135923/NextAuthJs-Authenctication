import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b">
      {/* Logo Section */}
      <Link
        href="/"
        className="text-2xl font-bold tracking-tighter text-blue-600 hover:opacity-80 transition-opacity"
      >
        NEXTAUTH
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          Home
        </Link>

        <Link
          href="/login"
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          Login
        </Link>

        <Link
          href="/reg"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
