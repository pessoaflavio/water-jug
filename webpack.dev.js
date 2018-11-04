const merge = require('webpack-merge');
const common = require('./webpack.config.js');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'local/[name].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'local/[name].css'
    })
  ]
});
