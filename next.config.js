
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: ''
      }
    ],
  },
}