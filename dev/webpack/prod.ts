import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as fs                    from 'fs-extra';
import HtmlWebpackPlugin          from 'html-webpack-plugin';
import MiniCssExtractPlugin       from 'mini-css-extract-plugin';
import * as path                  from 'path';
import { TsconfigPathsPlugin }    from 'tsconfig-paths-webpack-plugin';
import * as webpack               from 'webpack';
import { BundleAnalyzerPlugin }   from 'webpack-bundle-analyzer';
import WorkboxPlugin              from 'workbox-webpack-plugin';
import config                     from '../config';
import htmlLoaderOptions          from './html-loader-options';


const SIZE_14KB = 14336;

// See https://github.com/vuejs/vue-loader/issues/678#issuecomment-370965224
const babelrc = fs.readJsonSync(path.join(__dirname, '../../.babelrc'));


const prodConfig: webpack.Configuration = {
  mode: 'production',

  context: config.absSource(''),

  profile: true,

  entry: {
    index: ['./polyfills', './index'],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.es6', '.js', '.json'],
    alias     : {
      'react'               : 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom'           : 'preact/compat',
    },
    plugins   : [
      new TsconfigPathsPlugin({
        configFile: config.absRoot('tsconfig.json'),
      }),
    ],
  },

  output: {
    path         : config.absOutput(),
    publicPath   : '',
    filename     : '[id]-[hash].js',
    chunkFilename: '[id]-[chunkHash].chunk.js',
    globalObject : 'self',
  },

  module: {
    rules: [
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
              transpileOnly: true,
              configFile   : config.absRoot('tsconfig.json'),
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
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              modules         : {
                mode          : 'global',
                localIdentName: '[hash:base64]',
              },
              localsConvention: 'camelCase',
              importLoaders   : 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              modules         : {
                mode          : 'global',
                localIdentName: '[hash:base64]',
              },
              localsConvention: 'camelCase',
              importLoaders   : 4,
            },
          },
          'postcss-loader',
          'resolve-url-loader?keepQuery',
          'svg-transform-loader/encode-query',
          {
            loader : 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [config.source('styles')],
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
              name: '[hash].[ext]',
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
                  // limit for base64 inlining in bytes
                  limit   : SIZE_14KB,
                  // custom naming format if file is larger than
                  // the threshold
                  name    : '[hash].[ext]',
                  fallback: 'file-loader?outputPath=assets&publicPath=./',
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
                  name      : 'weixin-[hash].[ext]',
                  outputPath: 'assets',
                  publicPath: './',
                  // See: https://github.com/webpack-contrib/file-loader/issues/350
                  esModule  : false,
                },
              },
            ],
          },
          {
            use: [
              {
                loader : 'url-loader',
                options: {
                  // limit for base64 inlining in bytes
                  limit   : SIZE_14KB,
                  // custom naming format if file is larger than
                  // the threshold
                  name    : '[hash].[ext]',
                  fallback: 'file-loader?outputPath=assets&publicPath=./',
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

  optimization: {
    moduleIds             : 'named',
    chunkIds              : 'named',
    removeAvailableModules: true,
    splitChunks           : {
      chunks : 'async',
      // minChunks: 1,
      // maxAsyncRequests: Infinity,
      // maxInitialRequests: Infinity,
      maxSize: 200 * 1024,
    },
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig                   : config.absRoot('tsconfig.json'),
      useTypescriptIncrementalApi: false,
    }),

    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting : true,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BASE_URL': JSON.stringify(config.baseUrl),
    }),

    new BundleAnalyzerPlugin({
      analyzerMode  : 'static',
      defaultSizes  : 'gzip',
      openAnalyzer  : false,
      reportFilename: config.absRoot('test_results/bundle-analysis-report.html'),
    }),

    new MiniCssExtractPlugin({
      filename     : '[id]-[hash].css',
      chunkFilename: '[id]-[chunkHash].chunk.css',
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

export default prodConfig;
