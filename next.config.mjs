// next.config.mjs
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add a custom loader for .tokens files
    config.module.rules.push({
      test: /\.tokens$/,
      use: [
        {
          loader: 'style-loader', // Injects CSS into the DOM
        },
        {
          loader: 'css-loader', // Interprets @import and url() like import/require() and resolves them
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
