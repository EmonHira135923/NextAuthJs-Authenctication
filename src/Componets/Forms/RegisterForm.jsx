"use client";
import { DomainURL } from "@/utils/DomainURL";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterForm = () => {
  const router = useRouter();
  const handleform = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("email", form.email.value);
    formData.append("password", form.password.value);
    formData.append("image", form.image.files[0]);

    // 🔥 FormData এর ভিতরের সব ডেটা দেখার জন্য এই অংশটি যোগ করা হয়েছে:
    console.log("--- Debugging FormData ---");
    for (let [key, value] of formData.entries()) {
      if (key === "image") {
        console.log(`${key}:`, value.name, `(${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    console.log("--------------------------");

    const res = await fetch(`${DomainURL}/auth/register`, {
      method: "POST",
      body: formData, // ব্রাউজার নিজ থেকেই 'Content-Type': 'multipart/form-data' সেট করে নিবে
    });

    const data = await res.json();
    console.log("Response from server:", data);

    // check success
    if (data.success && data.result?.insertedId) {
      alert("Form Submitted");
      form.reset();
      router.push("/");
    } else {
      alert("Registration failed: " + (data.message || "Unknown error"));
    }
  };
  return (
    <div>
      <form onSubmit={handleform} className="space-y-4 text-black">
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        {/* Image Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
          <p className="text-xs text-gray-400 mt-2">
            Must be at least 8 characters long.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md active:scale-[0.98] mt-2"
        >
          Create Free Account
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
