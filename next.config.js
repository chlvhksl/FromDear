const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/FromDear' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
