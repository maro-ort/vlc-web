const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@svg': path.resolve(__dirname, 'src/svg'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@vlc': path.resolve(__dirname, 'src/vlc'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
}