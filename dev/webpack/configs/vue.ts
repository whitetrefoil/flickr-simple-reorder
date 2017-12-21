// tslint:disable:no-import-side-effect no-implicit-dependencies

import * as ExtractTextPlugin from 'extract-text-webpack-plugin'

export const vueOptionsDev = {
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

export const vueOptionsProd = {
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

export const vueLoaderDev = {
  loader : 'vue-loader',
  options: vueOptionsDev,
}

export const vueLoaderProd = {
  loader : 'vue-loader',
  options: vueOptionsProd,
}
