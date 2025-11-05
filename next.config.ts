import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure allowed origins for development
  ...(process.env.NODE_ENV === 'development' && {
    async rewrites() {
      return {
        beforeFiles: [
          {
            source: '/_next/:path*',
            destination: '/_next/:path*',
            has: [
              {
                type: 'header',
                key: 'host',
                value: '(?<host>.*\\.preview\\.metainside\\.io)'
              }
            ]
          }
        ]
      };
    }
  }),
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://*.preview.metainside.io',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  }
};

export default nextConfig;
