"use client";
import { DomainURL } from "@/utils/DomainURL";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterForm = () => {
  const router = useRouter();
  const handleform = async (e) => {
    e.preventDefault();
    const form = e.target;
    const imageFile = form.image.files[0];

    // ১. ইমেজ সিলেক্ট করা হয়েছে কিনা চেক করুন
    if (!imageFile) {
      alert("Please upload an image first!");
      return;
    }

    try {
      // ২. Cloudinary-তে আপলোড করার জন্য FormData তৈরি
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageFile);
      cloudinaryData.append("upload_preset", "fronted_image_upload"); // আপনার তৈরি করা Preset Name দিন
      cloudinaryData.append("cloud_name", "dd015bguh");
      cloudinaryData.append("folder", "users");

      console.log("Uploading image to Cloudinary...");

      // ৩. Cloudinary API-তে POST রিকোয়েস্ট
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dd015bguh/image/upload",
        {
          method: "POST",
          body: cloudinaryData,
        },
      );

      const imageData = await cloudinaryRes.json();

      if (!imageData.secure_url) {
        throw new Error("Image upload failed to Cloudinary");
      }

      const imageUrl = imageData.secure_url;
      console.log("Image Uploaded! URL:", imageUrl);

      // ৪. আপনার নিজের ডাটাবেজে পাঠানোর জন্য অবজেক্ট তৈরি
      const userData = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        image: imageUrl, // এখানে সরাসরি স্ট্রিং URL যাচ্ছে
      };

      console.log("Sending data to your backend...", userData);

      // ৫. আপনার ব্যাকএন্ডে ফাইনাল রিকোয়েস্ট
      const res = await fetch(`${DomainURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      // ৬. সাকসেস চেক
      if (data.success) {
        alert("Registration Successful!");
        form.reset();
        router.push("/");
      } else {
        alert("Registration failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong. Check console for details.");
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
