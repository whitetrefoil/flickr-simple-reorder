// tslint:disable:no-implicit-dependencies

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import fs                         from 'fs-extra'
import HtmlWebpackPlugin          from 'html-webpack-plugin'
import * as path                  from 'path'
import { VueLoaderPlugin }        from 'vue-loader'
import * as webpack               from 'webpack'
import config                     from '../config'
import excludeFor                 from './configs/exclude'
import lodashPlugin               from './configs/lodash'


// See https://github.com/vuejs/vue-loader/issues/678#issuecomment-370965224
const babelrc = fs.readJsonSync(path.join(__dirname, '../../.babelrc'))


const devConfig: webpack.Configuration = {

  mode: 'development',

  devtool: 'source-map',

  context: config.absSource(''),

  entry: {
    index: ['./polyfills', './index'],
  },

  resolve: {
    extensions : ['.vue', '.ts', '.js', '.json'],
    // mainFields : ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', 'main'],
    unsafeCache: false,
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
        test   : /\.html$/,
        exclude: /node_modules/,
        use    : ['html-loader?interpolate'],
      },
      {
        test   : /\.ts$/,
        use    : [
          'babel-loader',
          {
            loader : 'ts-loader',
            options: {
              transpileOnly: true,
              configFile   : config.absRoot('tsconfig.json'),
              // appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
        exclude: excludeFor('ts'),
      },
      {
        test   : /\.js$/,
        use    : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
        ],
        exclude: excludeFor('babel'),
      },
      {
        test   : /\.vue/,
        use    : ['vue-loader'],
        exclude: excludeFor('vue'),
      },
      {
        test: /\.css$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=1',
          'postcss-loader?sourceMap',
        ],
      },
      {
        test: /\.less$/,
        use : [
          'vue-style-loader',
          'css-loader?sourceMap&importLoaders=2',
          'postcss-loader?sourceMap',
          'less-loader?sourceMap',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : ['url-loader'],
      },
    ],
  },

  node: {
    __dirname : true,
    __filename: true,
  },

  plugins: [
    lodashPlugin,
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: config.absRoot('tsconfig.json'),
      vue     : true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
        FLICKR_SECRET  : JSON.stringify(process.env.FLICKR_SECRET),
        FLICKR_KEY     : JSON.stringify(process.env.FLICKR_KEY),
        VERSION        : JSON.stringify(config.pkg.version),
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      hash    : false,
      minify  : false,
      inject  : 'body',
    }),
  ],
}

export default devConfig
