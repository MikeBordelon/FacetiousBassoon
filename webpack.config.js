var path = require('path');
var webpack = require('webpack');
var APP_DIR = path.resolve(__dirname, 'app');
var SERVER_DIR = path.resolve(__dirname, 'server');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client', 'webpack/hot/dev-server',
    APP_DIR + '/app.js'
  ],
  output: {
    path: path.join(__dirname, 'app/public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: APP_DIR
      },
      {
        test: /\.(png|jpg|svg)$/,
        include: path.join(__dirname, 'public'),
        loader: 'url-loader?limit=30000&name=images/[name].[ext]'
      }]
  }
};