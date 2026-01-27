"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserCard = () => {
  const { data: session } = useSession();

  return (
    <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mt-10">
      {/* Top Banner / Background */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

      <div className="px-6 pb-8">
        <div className="relative -mt-12 flex justify-center">
          {/* User Image */}
          <div className="p-1 bg-white rounded-full">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center text-gray-400 text-3xl font-bold shadow-md">
                {session?.user?.name?.[0] || "U"}
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            {session?.user?.name || "Guest User"}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {session?.user?.email || "No email provided"}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center mt-6">
          <span className="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-200">
            Active Session
          </span>
        </div>

        {/* Session Details (JSON - Styled) */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2 ml-1">
            Session Debug
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-[10px] font-mono text-gray-600 border border-gray-200 overflow-x-auto max-h-32">
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
