/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",   // for Google profile photos
      "avatars.githubusercontent.com" // for GitHub profile photos
    ],
  },

  devIndicators: {
    appIsRunning: false,
  },

};

export default nextConfig;





