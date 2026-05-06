/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    config.resolve.alias = {
      ...config.resolve.alias,
      'porto/internal': false,
      'accounts': false,
    };
    
    return config;
  },
};

export default nextConfig;
