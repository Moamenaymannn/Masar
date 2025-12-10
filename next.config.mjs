/** @type {import('next').NextConfig} */
const nextConfig = {
          reactStrictMode: true,
          images: {
                    domains: ['images.unsplash.com'],
          },
          experimental: {
                    serverActions: {
                              allowedOrigins: ['localhost:3000', 'localhost:3002'],
                    },
          },
          async headers() {
                    return [
                              {
                                        source: '/:path*',
                                        headers: [
                                                  {
                                                            key: 'Content-Security-Policy',
                                                            value: process.env.NODE_ENV === 'development'
                                                                      ? `
                default-src 'self' https:;
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
                style-src 'self' 'unsafe-inline' https:;
                img-src 'self' data: https:;
                font-src 'self' data: https:;
                connect-src 'self' https:;
                frame-src 'self' https:;
                frame-ancestors 'none';
                form-action 'self';
                base-uri 'self';
                object-src 'none';
                media-src 'self' data: https:;
              `.replace(/\s+/g, ' ').trim()
                                                                      : `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com;
                style-src 'self' 'unsafe-inline';
                img-src 'self' data: https:;
                font-src 'self';
                connect-src 'self' https://api.stripe.com;
                frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
                frame-ancestors 'none';
                form-action 'self';
                base-uri 'self';
                object-src 'none';
                media-src 'self' data:;
              `.replace(/\s+/g, ' ').trim(),
                                                  },
                                        ],
                              },
                    ];
          },
          async rewrites() {
                    return [
                              {
                                        source: '/api/:path*',
                                        destination: '/api/:path*',
                              },
                    ];
          },
};

export default nextConfig;
