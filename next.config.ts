import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  exports: {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/:path*', // Proxy to Backend
        },
      ];
    },
  },
};

export default nextConfig;
