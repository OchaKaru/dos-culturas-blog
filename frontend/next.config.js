const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    loader: 'akamai',
    path: '',
  },
  assetPrefix: './',
};

module.exports = nextConfig;
