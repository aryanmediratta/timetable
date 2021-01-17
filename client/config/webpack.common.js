const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 8000;

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src', 'index.js')],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    port,
    historyApiFallback: true,
    overlay: true,
    open: true,
    proxy: { '/api/**': { target: 'http://localhost:5000', secure: true, changeOrigin: true } },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /.*\.(gif|png|jp(e*)g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 21000,
              name: 'images/[name]_[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../node_modules'),
        exclude: [/node_modules/],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
