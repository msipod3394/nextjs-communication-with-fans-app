/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      {
        protocol: "https",
        hostname: "ktkpvglkwuinpetxlemb.supabase.co",
      },
    ],
  },
};

export default nextConfig;
