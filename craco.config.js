const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@ctx': path.resolve(__dirname, 'src/ctx'),
      '@src': path.resolve(__dirname, 'src'),
      '@svg': path.resolve(__dirname, 'src/svg'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@vlc': path.resolve(__dirname, 'src/vlc'),
    },
  },
}