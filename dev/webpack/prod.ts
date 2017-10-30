// tslint:disable:no-import-side-effect no-implicit-dependencies

import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as _ from 'lodash'
import * as webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import config from '../config'
import lodashPlugin from './configs/lodash'
import { vueLoaderProd } from './configs/vue'

const SIZE_14KB = 14336

export default {

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
    path         : config.absOutput(''),
    publicPath   : '/',
    filename     : 'js/[name]-[chunkHash].js',
    chunkFilename: 'js/chunks/[name]-[chunkHash].chunk.js',
  },

  module: {
    rules: [
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
        use : [vueLoaderProd],
      },
      {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          use: ['css-loader?minimize&safe'],
        }),
      },
      {
        test: /\.less/,
        use : ExtractTextPlugin.extract({
          use: [
            'css-loader?minimize&safe',
            'less-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : [
          {
            loader: 'url-loader',
            query : {
              // limit for base64 inlining in bytes
              limit: SIZE_14KB,
              // custom naming format if file is larger than
              // the threshold
              name : 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    lodashPlugin,
    new webpack.optimize.ModuleConcatenationPlugin(),
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
    new BundleAnalyzerPlugin({
      analyzerMode  : 'static',
      defaultSizes  : 'gzip',
      openAnalyzer  : false,
      reportFilename: '../test_results/bundle-analysis-report.html',
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename : 'css/[name]-[contenthash].css',
      allChunks: true,
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
} as webpack.Configuration
