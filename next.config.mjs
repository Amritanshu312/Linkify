/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL
  }
};

export default nextConfig;
