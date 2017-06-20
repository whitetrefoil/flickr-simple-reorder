const ExtractTextPlugin      = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin      = require('html-webpack-plugin')
const isEmpty                = require('lodash/isEmpty')
const webpack                = require('webpack')
const { config, initialize } = require('../config')
const { lodashPlugin }       = require('./configs/lodash')
const { vueLoaderProd }      = require('./configs/vue')

if (config.isInitialized !== true) {
  initialize()
}

const SIZE_14KB = 14336

module.exports = {

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
        use : [
          'awesome-typescript-loader?configFileName=tsconfig.json',
        ],
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
        FLICKR_SECRET  : JSON.stringify(process.env.FLICKR_SECRET),
        FLICKR_KEY     : JSON.stringify(process.env.FLICKR_KEY),
        VERSION        : JSON.stringify(config.version),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index', 'theme', 'vendor', 'polyfills'],
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
      base          : isEmpty(process.env.VUE_ROUTER_BASE)
        ? '/'
        : process.env.VUE_ROUTER_BASE,
    }),
  ],
}
