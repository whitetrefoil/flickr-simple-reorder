KEYS =
  dev:
    key: '5cdc0f5ec9c28202f1098f615edba5cd'
    secret: 'e3b842e3b923b0fb'
  test:
    key: '78d5aef1d2b19ea9fa6f963d32628a88'
    secret: 'e0e22e8361fc0f27'

module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  require('time-grunt')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    bower:
      install:
        options:
          targetDir: 'src/tpls'
          install: true
          copy: false
    clean:
      dist: [ 'dist' ]
      server: [ '.server' ]
      building: [ '.building', '.tmp' ]
      cache: [ '.sass-cache' ]
    coffee:
      server:
        files: [
          expand: true
          cwd: 'src'
          src: [ '**/*.+(coffee|litcoffee)' ]
          dest: '.server/'
          ext: '.js'
          extDot: 'last'
        ]
      building:
        files: [
          expand: true
          cwd: 'src'
          src: [ '**/*.+(coffee|litcoffee)' ]
          dest: '.building'
          ext: '.js'
          extDot: 'last'
        ]
    compass:
      dist:
        options:
          fontsDir: 'src/css/fonts'
          httpFontsDir: 'css/fonts'
          sassDir: 'src/css'
          cssDir: 'dist/css'
          environment: 'production'
          outputStyle: 'compressed'
          bundleExec: true
      server:
        options:
          fontsDir: 'src/css/fonts'
          httpFontsDir: 'css/fonts'
          sassDir: 'src/css'
          cssDir: '.server/css'
          outputStyle: 'expanded'
          bundleExec: true

    connect:
      options:
        port: 8000
        base: ['.server', 'src']
        open: 'http://localhost:8000'
        middleware: (connect, options, middlewares) ->
          middlewares.unshift require('grunt-connect-proxy/lib/utils').proxyRequest
          middlewares.push (req, res, next) ->
            console.log req.url
            next()
          middlewares
      server:
        proxies: [
          context:      '/api'
          host:         'localhost'
          port:         9999
        ]
        options:
          livereload: true
    copy:
      bootstrap:
        files: [
          expand: true
          cwd: 'src/lib/bootstrap-sass-official/assets/fonts'
          src: [ 'bootstrap/**/*' ]
          dest: 'src/css/fonts/'
        ]
      dist:
        files: [
          expand: true
          cwd: 'src'
          src: [ '**/*', '!lib/**/*', '!**/*.{coffee,litcoffee,sass,scss,js}' ]
          filter: 'isFile'
          dest: 'dist/'
        ]
      building:
        files: [
          expand: true
          cwd: 'src'
          src: [ '**/*.js', '**/*.html' ]
          filter: 'isFile'
          dest: '.building'
        ]
      usemin:
        files: [
          expand: true
          cwd: '.building'
          src: [ '**/*.html', '!lib/**/*' ]
          filter: 'isFile'
          dest: 'dist'
        ]
    htmlmin:
      options:
        removeComments: true
        removeCommentsFromCDATA: true
        removeCDATASectionsFromCDATA: true
        collapseWhitespace: true
        conservativeCollapse: true
        collapseBooleanAttributes: true
        removeOptionalTags: true
      dist:
        files: [
          expand: true
          cwd: 'dist'
          src: [ '**/*.html' ]
          dest: 'dist'
        ]

    replace:
      building:
        options:
          usePrefix: false
          patterns: [
            match: KEYS.dev.key
            replacement: KEYS.test.key
          ,
            match: KEYS.dev.secret
            replacement: KEYS.test.secret
          ]
        files: [
          '.building/js/services/auth.js': '.building/js/services/auth.js'
        ]


    watch:
      options:
        spawn: false
        forever: true
        livereload: true
      compass:
        files: 'src/**/*.+(sass|scss)'
        tasks: 'compass:server'
      coffee:
        files: 'src/**/*.+(coffee|litcoffee)'
        tasks: 'coffee:server'
      html:
        files: 'src/**/*.html'
      css:
        files: 'src/**/*.css'
    filerev:
      dist:
        src: [
          'dist/css/**/*.css'
          'dist/fonts/**/*.*'
          'dist/js/**/*.js'
        ]
    useminPrepare:
      html: [ '.building/**/*.html' ]
    usemin:
      html: [ 'dist/**/*.html' ]
      css: [ 'dist/css/**/*.css' ]
      options:
        assetsDirs: [ 'dist', 'dist/fonts', 'dist/img' ]

  grunt.registerTask 'preServer',
      [ 'copy:bootstrap', 'compass:server', 'coffee:server' ]
  # preCompile: compile the files to optimize
  grunt.registerTask 'compile', 'Compile & optimize the codes',
      [ 'copy:building', 'copy:dist', 'coffee:building', 'compass:dist' ]

  grunt.registerTask 'optimize', 'Optimize JS files',
      [ 'useminPrepare', 'copy:usemin', 'concat:generated'
        'uglify:generated', 'filerev', 'usemin', 'htmlmin' ]

  grunt.registerTask 'build', 'Build the code',
      [ 'bower:install', 'clean:dist', 'clean:server', 'copy:bootstrap'
        'compile', 'optimize', 'clean:building', 'clean:cache' ]

  grunt.registerTask 'release', 'Build the code for production',
      [ 'bower:install', 'clean:dist', 'clean:server', 'copy:bootstrap'
        'compile', 'replace:building', 'optimize', 'clean:building', 'clean:cache' ]

  grunt.registerTask 'server', 'Start a preview server',
      [ 'clean:dist', 'clean:server', 'preServer'
        'configureProxies:server', 'connect:server', 'watch' ]

  grunt.registerTask 'default', 'UT (when has) & build',
      [ 'build' ]
