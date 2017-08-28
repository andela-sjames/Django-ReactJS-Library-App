import * as path from 'path';
import * as webpack from 'webpack';
const BundleTracker = require('webpack-bundle-tracker');

export default {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.d.ts'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new BundleTracker({filename: './webpack-stats.json'})
  ],
  entry: [
    './src/index.tsx'
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '../static/'),
    filename: 'js/[name].js',
    publicPath: 'http://0.0.0.0:9000/'
  },
  devServer: {
    host: "0.0.0.0",
    publicPath: 'http://0.0.0.0:9000/',
    headers: { 'Access-Control-Allow-Origin': '*' },
    compress: true,
    port: 9000,
    // TODO: Discuss API routing and requests with @gentlefella
    // proxy: {
    //   '/api': {
    //     target: 'http://0.0.0.0:8000',
    //     secure: false,
    //     pathRewrite: {'^/api' : ''}
    //   }
    // },
    clientLogLevel: 'none',
    hot: true,
    inline: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]'
        }
      }
    ]
  }
};
