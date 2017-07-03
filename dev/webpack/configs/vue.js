const ExtractTextPlugin = require('extract-text-webpack-plugin')

const vueOptionsDev = {
  loaders: {
    ts  : [
      'awesome-typescript-loader?configFileName=tsconfig.json',
      'tslint-loader',
    ],
    less: [
      'vue-style-loader',
      'css-loader?sourceMap',
      'less-loader?sourceMap',
    ],
  },
}

const vueOptionsProd = {
  loaders: {
    ts: [
      'awesome-typescript-loader?configFileName=tsconfig.json',
    ],

    css: ExtractTextPlugin.extract({
      use: 'css-loader?minimize&safe',
    }),

    less: ExtractTextPlugin.extract({
      use: [
        'css-loader?minimize&safe',
        'less-loader',
      ],
    }),
  },
}

const vueLoaderDev = {
  loader : 'vue-loader',
  options: vueOptionsDev,
}

const vueLoaderProd = {
  loader : 'vue-loader',
  options: vueOptionsProd,
}

module.exports = {
  vueOptionsDev,
  vueOptionsProd,
  vueLoaderDev,
  vueLoaderProd,
}
