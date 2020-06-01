import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as fs                    from 'fs-extra';
import HtmlWebpackPlugin          from 'html-webpack-plugin';
import * as path                  from 'path';
import { TsconfigPathsPlugin }    from 'tsconfig-paths-webpack-plugin';
import * as webpack               from 'webpack';
import WorkboxPlugin              from 'workbox-webpack-plugin';
import config                     from '../config';
import htmlLoaderOptions          from './html-loader-options';


const SIZE_14KB = 14336;

// See https://github.com/vuejs/vue-loader/issues/678#issuecomment-370965224
const babelrc = fs.readJsonSync(path.join(__dirname, '../../.babelrc'));


const devConfig: webpack.Configuration = {

  mode: 'development',

  devtool: 'inline-source-map',

  context: config.absSource(''),

  entry: {
    index: ['./polyfills', './index'],
  },

  resolve: {
    extensions : ['.tsx', '.ts', '.jsx', '.es6', '.js', '.json'],
    unsafeCache: false,
    alias      : {
      'react'               : 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom'           : 'preact/compat',
    },
    plugins    : [
      new TsconfigPathsPlugin({
        configFile: config.absRoot('tsconfig.json'),
      }),
    ],
  },

  output: {
    path         : config.absOutput(),
    publicPath   : '',
    filename     : '[name]-[hash].js',
    chunkFilename: '[name]-[chunkHash].chunk.js',
    globalObject : 'self',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.[jt]sx?$/,
        use    : [
          'source-map-loader',
          'eslint-loader?emitWarning',
        ],
        include: [
          config.absSource(),
        ],
      },
      {
        test   : /\.html$/,
        exclude: /node_modules/,
        use    : [
          {
            loader : 'html-loader',
            options: htmlLoaderOptions,
          },
        ],
      },
      {
        test: /\.(?:md|markdown)$/,
        use : [
          {
            loader : 'html-loader',
            options: htmlLoaderOptions,
          },
          {
            loader : 'markdown-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
          {
            loader : 'ts-loader',
            options: {
              transpileOnly       : true,
              experimentalWatchApi: true,
              configFile          : config.absRoot('tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
        ],
      },
      {
        test: /\.css$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options: {
              modules         : {
                mode          : 'global',
                localIdentName: '[path][name]---[local]---[hash:base64]',
              },
              localsConvention: 'camelCase',
              sourceMap       : true,
              importLoaders   : 1,
            },
          },
          'postcss-loader?sourceMap',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options: {
              modules         : {
                mode          : 'global',
                localIdentName: '[path][name]---[local]---[hash:base64]',
              },
              localsConvention: 'camelCase',
              sourceMap       : true,
              importLoaders   : 4,
            },
          },
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap&keepQuery',
          'svg-transform-loader/encode-query',
          {
            loader : 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [config.source()],
              },
              sourceMap  : true,
            },
          },
        ],
      },
      {
        test: /manifest\.webmanifest$/,
        use : [
          {
            loader : 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test : /\.(?:png|jpe?g|gif|svg|webp|webm|woff2?|ttf|eot|ico)(?:\?.*)?$/,
        oneOf: [
          {
            test: /icon\.c\.png$/,
            use : [
              {
                loader : 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              },
            ],
          },
          {
            test: /\.svg(?:\?.*)?$/,
            use : [
              {
                loader : 'url-loader',
                options: {
                  limit   : SIZE_14KB,
                  name    : '[name]-[hash].[ext]',
                  fallback: 'file-loader',
                },
              },
              'svg-transform-loader',
            ],
          },
          {
            test: /\.weixin\.(?:png|jpe?g|gif|svg|webp|webm|woff2?|ttf|eot|ico)(?:\?.*)?$/,
            use : [
              {
                loader : 'file-loader',
                options: {
                  name    : '[name]-[hash].[ext]',
                  // See: https://github.com/webpack-contrib/file-loader/issues/350
                  esModule: false,
                },
              },
            ],
          },
          {
            use: [
              {
                loader : 'url-loader',
                options: {
                  limit   : SIZE_14KB,
                  name    : '[name]-[hash].[ext]',
                  fallback: 'file-loader',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  stats: {
    // See: https://github.com/TypeStrong/ts-loader#transpileonly-boolean-defaultfalse
    warningsFilter: /export .* was not found in/,
  },

  node: {
    __dirname : true,
    __filename: true,
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig                   : config.absRoot('tsconfig.json'),
      useTypescriptIncrementalApi: false,
    }),

    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting : true,
    // }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_URL': JSON.stringify(config.baseUrl),
    }),

    new HtmlWebpackPlugin({
      filename      : 'index.html',
      template      : './index.html',
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'manual',
      base          : `${config.baseUrl}/`,
    }),
  ],
};

export default devConfig;
