// tslint:disable:no-import-side-effect no-implicit-dependencies

import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import config from '../config'
import lodashPlugin from './configs/lodash'
import { vueLoaderDev } from './configs/vue'

export default {

  devtool: 'source-map',

  context: config.absSource(''),

  entry: {
    polyfills: ['./polyfills'],
    vendor   : ['./vendor'],
    theme    : ['./theme'],
    index    : ['./index'],
  },

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
  },

  output: {
    path         : config.absBuilding(''),
    publicPath   : '/',
    filename     : '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.[jt]s$/,
        use    : ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test   : /\.ts$/,
        use    : ['tslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use : ['awesome-typescript-loader?configFileName=tsconfig.json'],
      },
      {
        test: /\.js$/,
        use : ['babel-loader'],
      },
      {
        test: /\.vue/,
        use : [vueLoaderDev],
      },
      {
        test: /\.css$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap',
        ],
      },
      {
        test: /\.less$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap',
          'less-loader?sourceMap',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : ['url-loader'],
      },
    ],
  },

  plugins: [
    lodashPlugin,
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
        FLICKR_SECRET  : JSON.stringify(process.env.FLICKR_SECRET),
        FLICKR_KEY     : JSON.stringify(process.env.FLICKR_KEY),
        VERSION        : JSON.stringify(config.pkg.version),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'theme', 'vendor', 'polyfills'],
    }),
    new HtmlWebpackPlugin({
      filename      : 'index.html',
      template      : './index.html',
      chunks        : ['polyfills', 'vendor', 'theme', 'index'],
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'auto',
      base          : _.isEmpty(process.env.VUE_ROUTER_BASE)
        ? '/'
        : process.env.VUE_ROUTER_BASE,
    }),
  ],

  performance: {
    hints: false,
  },
} as webpack.Configuration
