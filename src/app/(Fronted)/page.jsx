import AuthButton from "@/Componets/Buttons/AuthButton";
import ServerUserCard from "@/Componets/Cards/ServerUserCard";
import UserCard from "@/Componets/Cards/UserCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Action Buttons */}
        <div className="flex mb-10 justify-center gap-4">
          <AuthButton />
        </div>
        {/* Illustration/Image Section */}
        <div className="relative w-full h-64 md:h-80">
          <Image
            src="https://illustrations.popsy.co/gray/digital-nomad.svg"
            alt="Authentication Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <UserCard />
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Secure Auth for <span className="text-blue-600">Next.js</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple, lightweight starter for implementing NextAuth.js. Manage
            your users, protect your routes, and scale with ease.
          </p>
        </div>
        <ServerUserCard />
      </div>
    </main>
  );
}
