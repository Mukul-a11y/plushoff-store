/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: false,
  
  // Enable image optimization with more domains and better caching
  images: {
    domains: ['res.cloudinary.com', 'medusa-public-images.s3.amazonaws.com', 'images.unsplash.com'],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // Configure webpack for optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize CSS
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      }
      
      // Add terser for better minification
      config.optimization.minimize = true;
      
      // Enable module concatenation
      config.optimization.concatenateModules = true;
    }
    
    return config
  },
  
  // Enable compression
  compress: true,
  
  // Configure headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ]
  },

  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  }
}

module.exports = nextConfig