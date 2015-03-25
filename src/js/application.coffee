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
    'A100': 'B0BFFA'
    'A200': '829BF5'
    'A400': '2953E6'
    'A700': '0026AA'
    contrastDefaultColor: 'light'
    contrastDarkColors: [
      '50', '100', '200', 'A100', 'A200'
    ]
    contrastLightColors: undefined

  $mdThemingProvider.definePalette 'flickrPink',
    '50': 'FFE1F1'
    '100': 'FFB4DA'
    '200': 'FF87C4'
    '300': 'FF5AAE'
    '400': 'FF2D62'
    '500': 'FF0084'
    '600': 'E60075'
    '700': 'CD0068'
    '800': 'B4005C'
    '900': '9B004F'
    'A100': 'FFB4C5'
    'A200': 'FF87A2'
    'A400': 'FF0084'
    'A700': 'CD0034'
    contrastDefaultColor: 'light'
    contrastDarkColors: [
      '50', '100', '200', 'A100', 'A200'
    ]
    contrastLightColors: undefined

  $mdThemingProvider.theme('default')
  .primaryPalette('flickrBlue')
  .accentPalette('flickrPink')

]
