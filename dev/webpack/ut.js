const webpack                = require('webpack')
const { config, initialize } = require('../config')

if (config.isInitialized !== true) {
  initialize()
}

module.exports = {

  devtool: 'inline-source-map',

  context: config.absSource(''),

  entry: {
    'webpack-entry': '../tests/webpack-entry.js',
  },

  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },

  output: {
    filename     : '[name].js',
    chunkFilename: '[id]-[name].chunk.js',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.js/,
        loader : 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test  : /\.ts$/,
        loader: 'babel-loader!ts-loader?configFileName=tsconfig.json',
      },
      {
        test  : /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue/,
        use : [
          {
            loader : 'vue-loader',
            options: {
              loaders: {
                ts  : 'ts-loader?configFileName=tsconfig.json',
                css : 'null-loader',
                sass: 'null-loader',
              },
            },
          },
        ],
      },
      {
        test  : /\.css$/,
        loader: 'null-loader',
      },
      {
        test  : /\.sass$/,
        loader: 'null-loader',
      },
      {
        test  : /\.(?:png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(?:\?\w*)?$/,
        loader: 'null-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV       : JSON.stringify(process.env.NODE_ENV),
        VUE_ROUTER_BASE: JSON.stringify(process.env.VUE_ROUTER_BASE),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      context: config.absSource(''),
    }),
  ],
}
