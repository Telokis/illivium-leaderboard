/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/leaderboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
