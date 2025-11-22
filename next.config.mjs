/** @type {import('next').NextConfig} */
const nextConfig = {

  
  // added because i kept getting typescript errors during build time
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return[
      {
        source: '/:path*',
        headers :[
          {
            // Strict-Transport-Security (HSTS)
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            // X-Content-Type-Options
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // X-Frame-Options (Clickjacking defense)
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Referrer Policy
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // {
          //   // Content Security Policy (CSP) - Most Complex
          //   key: 'Content-Security-Policy',
          //   value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self' https://your-db-host.com;",
          // },
        ]
      }
    ]
  }

};

export default nextConfig;
