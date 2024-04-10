/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'euc.li',
        protocol: 'https',
      },
    ],
  },
};

module.exports = nextConfig;
