import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /\/api\/.*$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 24 * 60 * 60 * 30, // 30 days
          },
          networkTimeoutSeconds: 10,
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif|ico)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
      }
    ],
  },
  reactStrictMode: true,
  serverExternalPackages: ["firebase-admin"],
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'motion',
      '@iconify/react',
      'date-fns',
      'lucide-react',
      'swr',
      'sonner',
      '@base-ui/react',
    ],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.jpeg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      }
    ];
  },
  turbopack: {},
};

export default withPWA(nextConfig);
