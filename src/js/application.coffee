'use strict'

angular.module 'flickrSimpleReorder', ['ui.router', 'angularMoment', 'offsetScroll', 'ngMaterial']
.config ['$anchorScrollProvider', ($anchorScrollProvider) ->
  $anchorScrollProvider.disableAutoScrolling()
]
.config ['offsetScrollProvider', (offsetScrollProvider) ->
  offsetScrollProvider.setOffset 70
]
# [https://material.angularjs.org/#/Theming/03_configuring_a_theme]()
.config ['$mdThemingProvider', ($mdThemingProvider) ->
  $mdThemingProvider.definePalette 'flickrBlue',
    '50': 'E2EFFF'
    '100': 'B0D2FA'
    '200': '82B6F5'
    '300': '559CF0'
    '400': '297FE6'
    '500': '0063DC'
    '600': '0059C3'
    '700': '004EAA'
    '800': '004291'
    '900': '003778'
    'A100': '0063DC'
    'A200': '0063DC'
    'A400': '0063DC'
    'A700': '0063DC'
    contrastDefaultColor: 'light'
    contrastDarkColors: [
      '50', '100', '200'
    ]
    contrastLightColors: undefined

  $mdThemingProvider.definePalette 'flickrPink',
    '50': 'FFE1F1'
    '100': 'FFB4DA'
    '200': 'FF87C4'
    '300': 'FF5AAE'
    '400': 'FF2D98'
    '500': 'FF0084'
    '600': 'E60075'
    '700': 'CD0068'
    '800': 'B4005C'
    '900': '9B004F'
    'A100': 'FF0084'
    'A200': 'FF0084'
    'A400': 'FF0084'
    'A700': 'FF0084'
    contrastDefaultColor: 'light'
    contrastDarkColors: [
      '50', '100', '200'
    ]
    contrastLightColors: undefined

  $mdThemingProvider.theme('default')
  .primaryPalette('flickrBlue')
  .accentPalette('flickrPink')

]
