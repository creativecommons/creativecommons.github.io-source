const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['./js/main.js','./js/ideas.js','./js/issue-finder.js', './sass/main.scss'],
  output: {
    path: path.resolve(__dirname, '../assets/static/gen'),
    filename: 'script.js',
  },
  resolve: {
    alias: {
      'vue$': path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'style.css',
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
