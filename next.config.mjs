/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Profile Pictures
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub Profile Pictures
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
