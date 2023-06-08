/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5500/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
