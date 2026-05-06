/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    config.resolve.alias = {
      ...config.resolve.alias,
      'porto/internal': false,
      'accounts': false,
      '@base-org/account': false,
      '@coinbase/wallet-sdk': false,
      '@metamask/connect-evm': false,
      'porto': false,
      '@safe-global/safe-apps-sdk': false,
      '@safe-global/safe-apps-provider': false,
    };
    
    return config;
  },
};

export default nextConfig;
