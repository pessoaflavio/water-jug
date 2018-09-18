const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=images/[name].[ext]'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader?name=fonts/[name].[ext]'
        ]
      }
    ]
  }
};

// {
//   test: /\.scss$/,
//   use: [
//     {
//       loader: "style-loader" // creates style nodes from JS strings
//     },
//     {
//       loader: "css-loader" // translates CSS into CommonJS
//     },
//     {
//       loader: "sass-loader" // compiles Sass to CSS
//     }
//   ]
// }
