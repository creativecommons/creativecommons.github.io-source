const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['./js/issue-finder.js'],
  output: {
    path: path.resolve(__dirname, '../assets/static/gen'),
    filename: 'issue-finder.js',
  },
  resolve: {
    fallback: { "buffer": false }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
};
