/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'pizzeria98.s3.eu-north-1.amazonaws.com'
          },
        ],
      },
};

export default nextConfig;
