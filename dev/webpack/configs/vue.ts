// tslint:disable:no-import-side-effect no-implicit-dependencies

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config            from '../../config'

export const vueOptionsDev = {
  loaders: {
    ts: [
      'babel-loader',
      {
        loader : 'ts-loader',
        options: {
          transpileOnly: true,
          configFile   : config.absRoot('tsconfig.json'),
        },
      },
    ],

    less: [
      'vue-style-loader',
      'css-loader?sourceMap&importLoaders=1',
      'less-loader?sourceMap',
    ],
  },

  preLoaders: {
    ts: 'tslint-loader!source-map-loader',
  },
}

export const vueOptionsProd = {
  loaders: {
    ts: [
      'babel-loader',
      {
        loader : 'ts-loader',
        options: {
          transpileOnly: true,
          configFile   : config.absRoot('tsconfig.json'),
        },
      },
    ],

    css: ExtractTextPlugin.extract({
      use: 'css-loader?minimize&safe',
    }),

    less: ExtractTextPlugin.extract({
      use: [
        'css-loader?minimize&safe&importLoaders=1',
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
