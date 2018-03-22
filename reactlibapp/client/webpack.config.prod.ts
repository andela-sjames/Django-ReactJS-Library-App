import * as path from 'path';
import * as webpack from 'webpack';
import * as dotenv from 'dotenv';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';

dotenv.config({
  path: '../.env',
});

const ExtractAppCSS = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash:8].css',
  allChunks: true,
});
const ExtractVendorCSS = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash:8].css',
  allChunks: true,
});

export default {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.d.ts'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      CLIENT_ID: process.env.CLIENT_ID,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/vendor.js',
      minChunks: (module) => (typeof module.context === 'string' && module.context.indexOf('node_modules') >= 0),
    }),
    ExtractAppCSS,
    ExtractVendorCSS,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      comments: false,
      sourceMap: true,
    }),
    new HTMLWebpackPlugin({
      template: '../templates/base.html',
      filename: '../assets/base.html'
    })
  ],
  entry: [
    './src/index.tsx',
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractAppCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!csso-loader!sass-loader',
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractVendorCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!csso-loader',
        }),
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]',
        },
      },
    ],
  },
};
