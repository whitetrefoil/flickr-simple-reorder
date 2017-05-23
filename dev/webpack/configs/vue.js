const ExtractTextPlugin = require('extract-text-webpack-plugin')

const vueOptionsDev = {
  loaders: {
    ts  : [
      'babel-loader',
      'ts-loader?configFileName=tsconfig.json',
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
      'babel-loader',
      'ts-loader?configFileName=tsconfig.json',
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

const vueOptionsTest = {
  loaders: {
    ts  : [
      'babel-loader',
      'ts-loader?configFileName=tsconfig.json',
    ],
    css : 'null-loader',
    less: 'null-loader',
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

const vueLoaderTest = {
  loader : 'vue-loader',
  options: vueOptionsTest,
}

module.exports = {
  vueOptionsDev,
  vueOptionsProd,
  vueOptionsTest,
  vueLoaderDev,
  vueLoaderProd,
  vueLoaderTest,
}
