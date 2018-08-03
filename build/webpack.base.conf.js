'use strict'
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf')
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var projectRoot = path.resolve(__dirname, '../')
var env = process.env.NODE_ENV || "development"

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
  mode:env,
  entry: {
    // app: path.join(__dirname, '../src', 'main.js')
    app: [
      path.join(__dirname, '../src', 'main.js')
    ]
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: env === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js',
    sourceMapFilename: "[file].map"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'static': path.resolve(__dirname, '../static'),
      'components': path.resolve(__dirname, '../src/components'),
      'root': path.resolve(__dirname, '../'),
      'base': path.resolve(__dirname, '/')
    },
    modules: [ path.join(__dirname, '../node_modules') ]
  },
  optimization: {
    splitChunks: {
      // Must be specified for HtmlWebpackPlugin to work correctly.
      // See: https://github.com/jantimon/html-webpack-plugin/issues/882
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  stats: { children: false },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
        {
          test: /\.styl(us)?$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        },
      {
        test: /\.scss$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              name: utils.assetsPath('css/[name].[hash:7].[ext]')
            }
          },
            'sass-loader']
      },
      {
        test: /(\.css$)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              name: utils.assetsPath('css/[name].[hash:7].[ext]')
            }
          },
        "css-loader"
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          // filename: 'style.[contenthash].css',
          filename: utils.assetsPath('css/[name].[hash:7].css'),
          chunkFilename: utils.assetsPath('css/[id].[hash:7].css'),
        }),
        new WebpackMd5Hash()
    ]

};
