fs         = require 'fs-extra'
path       = require 'path'
_          = require 'lodash'
gulp       = require 'gulp'
del        = require 'del'
gulp       = require 'gulp'
ngTemp     = require 'gulp-angular-templatecache'
coffee     = require 'gulp-coffee'
compass    = require 'gulp-compass'
connect    = require 'gulp-connect'
htmlmin    = require 'gulp-htmlmin'
gIf        = require 'gulp-if'
minifyCss  = require 'gulp-minify-css'
plumber    = require 'gulp-plumber'
replace    = require 'gulp-replace'
rev        = require 'gulp-rev'
revReplace = require 'gulp-rev-replace'
uglify     = require 'gulp-uglify'
useref     = require 'gulp-useref'
gutil      = require 'gulp-util'
proxy      = require 'http-proxy'
runSeq     = require 'run-sequence'
through2   = require 'through2'
argv       = require('yargs')
.alias('p', 'port')
.alias('r', 'release')
.argv


isDevMode = !argv.release
isReleaseMode = argv.release || false
serverPort = parseInt(argv.p, 10) || 8000
indexPage = 'index.html'

KEYS =
  dev:
    key: '5cdc0f5ec9c28202f1098f615edba5cd'
    secret: 'e3b842e3b923b0fb'
  test:
    key: '78d5aef1d2b19ea9fa6f963d32628a88'
    secret: 'e0e22e8361fc0f27'


# Internal Tasks
# -----

# minify html
htmlminPipe = ->
  htmlmin
    removeComments: true
    removeCommentsFromCDATA: true
    removeCDATASectionsFromCDATA: true
    collapseWhitespace: true
    conservativeCollapse: true
    removeScriptTypeAttributes: true
    removeStyleLinkTypeAttributes: true
    caseSensitive: true


# Coffee
coffeePipe = ->
  pipe = gulp.src 'src/js/**/*.coffee',
    base: 'src'
  .pipe plumber
    errorHandler: (error) ->
      gutil.log gutil.colors.red('Coffee ERROR:'), error.stack
      this.emit('end')
  .pipe coffee()

  if isReleaseMode
    pipe = pipe
    .pipe gIf "#{__dirname}/src/js/services/auth.js", replace(KEYS.dev.key, KEYS.test.key)
    .pipe gIf "#{__dirname}/src/js/services/auth.js", replace(KEYS.dev.secret, KEYS.test.secret)
    .pipe gIf "#{__dirname}/src/js/application.js", replace('$compileProvider.debugInfoEnabled(true)', '$compileProvider.debugInfoEnabled(false)')

  pipe
  .pipe gulp.dest if isDevMode then '.server' else '.building'

gulp.task '_coffee', -> coffeePipe()


# Bootstrap (fonts)
bootstrapPipe = ->
  gulp.src ['src/lib/bootstrap-sass-official/assets/fonts/bootstrap/**'],
    base: 'src/lib/bootstrap-sass-official/assets'
  .pipe gulp.dest if isDevMode then '.server/css' else '.building/css'
  .pipe gIf !isDevMode, gulp.dest 'dist/css'

gulp.task '_bootstrap', -> bootstrapPipe()


# Compass
compassPipe = ->
  gulp.src 'src/css/**/*.{sass,scss}',
    base: 'src'
  .pipe plumber
    errorHandler: (error) ->
      gutil.log gutil.colors.red('Compass ERROR:'), error.message
      this.emit('end')
  .pipe compass
    config_file: 'compass.rb'
    sass       : 'src/'
    css        : if isDevMode then '.server' else '.building'
    font       : if isDevMode then '.server/css/fonts' else '.building/css/fonts'
    image      : 'src/img'
    bundle_exec: true
    environment: if isDevMode then 'development' else 'production'
    style      : if isReleaseMode then 'compressed' else 'expanded'

gulp.task '_compass', -> compassPipe()


# Angular Templates
ngTempPipe = ->
  gulp.src "src/tpls/**/*.html",
    base: 'src'
  .pipe htmlminPipe()
  .pipe ngTemp "js/templates.js",
    module: 'flickrSimpleReorder'
    base  : path.join __dirname, 'src'
  .pipe gulp.dest '.building'

gulp.task '_ng-temp', -> ngTempPipe()


# HTML
htmlPipe = ->
  gulp.src 'src/*.html'
  .pipe gulp.dest if isDevMode then '.server' else '.building'

gulp.task '_html', -> htmlPipe()


# Misc.
miscPipe = ->
  gulp.src ['src/**/*.*', '!src/**/*.{html,coffee,sass,scss,js}', '!src/lib/**/**'],
    base: 'src'
  .pipe gulp.dest if isDevMode then '.server' else 'dist'

gulp.task '_misc', -> miscPipe()


# Server
gulp.task '_server', ->
  connect.server
    root      : ['.server', 'src']
    port      : serverPort
    livereload: true


# Watch
gulp.task '_watch', ->
  gulp.watch 'src/js/**/*.coffee', ['_coffee']
  gulp.watch 'src/css/**/*.{sass,scss}', ['_compass']
  gulp.watch '.server/**/*.css', ->
    gulp.src '.server/**/*.css'
    .pipe connect.reload()
  gulp.watch ['.server/**/**', '!.server/**/*.css'], ->
    gulp.src ['.server/**/**', '!.server/**/*.css']
    .pipe connect.reload()
  gulp.watch 'src/**/*.html', ->
    gulp.src 'src/**/*.html'
    .pipe connect.reload()


# Public Tasks
# -----


# Clean
gulp.task 'clean', (cb) ->
  del ['.building', '.compass-cache', '.sass-cache'], cb


# Dev Server
gulp.task 'serve', ['clean'], (cb) ->
  del.sync ['.server']
  runSeq '_bootstrap',
    ['_compass', '_coffee'],
    '_server',
    '_watch',
    cb


gulp.task 'asdf', ->
  gulp.src '.building/js/services/auth.js'
  .pipe replace(KEYS.dev.key, KEYS.test.key)
  .pipe replace(KEYS.dev.secret, KEYS.test.secret)
  .pipe gulp.dest '.building/js/services/asdf.js'

# Non-release Build
gulp.task 'build', ['clean'], (cb) ->
  isDevMode = false
  del.sync ['dist']

  runSeq '_bootstrap', [
    '_coffee'
    '_compass'
    '_ng-temp'
    '_html'
    '_misc'
  ], ->
    assets = useref.assets
      searchPath: ['.building', 'src']

    pipe = gulp.src '.building/*.html'
    .pipe replace(/<!-- templates: (.*?) -->/g, '$1')
    .pipe assets
    if isReleaseMode
      pipe = pipe
      .pipe gIf '*.css', minifyCss()
      .pipe gIf '*.js', uglify()
    pipe = pipe
    .pipe rev()
    .pipe assets.restore()
    .pipe useref()
    .pipe revReplace()
    if isReleaseMode
      pipe = pipe
      .pipe gIf '*.html', htmlminPipe()
    pipe
    .pipe gulp.dest 'dist'
    .on 'end', ->
      del ['.building', '.compass-cache', '.sass-cache'], cb
