import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cleanDistDir: true,
  distDir: 'dist',
  sassOptions: {
    implementation: 'sass-embedded'
  }
};

export default nextConfig;
