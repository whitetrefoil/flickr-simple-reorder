const DEFAULT_IS_DEVELOPMENT = false
const DEFAULT_PORT           = 8000
const DEFAULT_PREFIX         = '/services/'
const DEFAULT_INDEX          = 'index.html'
const DEFAULT_LIVERELOAD     = 'localhost'
const DEFAULT_PING           = 0
const DEFAULT_BACKEND        = 'https://www.flickr.com'

const DEFAULT_BUILDING_DIR    = '.building'
const DEFAULT_OUTPUT_DIR      = 'dist'
const DEFAULT_SOURCE_BASE_DIR = 'src'

const meow       = require('meow')
const { colors } = require('gulp-util')
const path       = require('path')

const argv = meow(`
    Usage:
      $ npm run gulp ${colors.yellow('<task>')} -- ${colors.yellow('<options>')}
    or:
      $ ./node_modules/.bin/gulp ${colors.yellow('<task>')} ${colors.yellow('<options>')}
    or (if have gulp installed globally):
      $ gulp ${colors.yellow('<task>')} ${colors.yellow('<options>')}

    Options:                                                     [${colors.gray('default value')}]
      common:
        -d, --development  Set NODE_ENV to "development"         [${colors.yellow('false')}]
      developing:
        -p, --port         port of preview server                [${colors.blue('8888')}]
        -x, --prefix       prefix to determine backend requests  [${colors.green('"/services/"')}]
                           can use ',' to specify multiple ones
        -i, --index        index page of preview server          [${colors.green('"index.html"')}]
        -l, --livereload   the hostname in livereload script     [${colors.green('"localhost"')}]
        -n, --ping         emulate the network delay (ms)        [${colors.blue('0')}]
        -e, --backend      destination of backend proxy          [${colors.green('"https://www.flickr.com"')}]

    For more detail of tasks / options, see code in "dev/gulp" directory.
  `,
  {
    boolean: ['development'],
    string : ['index', 'prefix', 'livereload', 'backend'],
    alias  : {
      d: 'development',
      p: 'port',
      x: 'prefix',
      i: 'index',
      l: 'livereload',
      n: 'ping',
    },
    default: {
      development: DEFAULT_IS_DEVELOPMENT,
      port       : DEFAULT_PORT,
      prefix     : DEFAULT_PREFIX,
      index      : DEFAULT_INDEX,
      livereload : DEFAULT_LIVERELOAD,
      ping       : DEFAULT_PING,
      backend    : DEFAULT_BACKEND,
    },
  },
)

export class ConfigNotInitializedError extends Error {
  isConfigNotInitializedError = true
}

const root     = path.join(__dirname, '..')
const source   = DEFAULT_SOURCE_BASE_DIR
const building = DEFAULT_BUILDING_DIR
const output   = DEFAULT_OUTPUT_DIR

interface IConfig {
  isInitialized: boolean
  argv?: any
  pkg?: any
  root?(...pathInRoot: string[]): string
  absRoot?(...pathInRoot: string[]): string
  source?(...pathInSource: string[]): string
  absSource?(...pathInSource: string[]): string
  building?(...pathInBuilding: string[]): string
  absBuilding?(...pathInBuilding: string[]): string
  output?(...pathInOutput: string[]): string
  absOutput?(...pathInOutput: string[]): string
  outputByEnv?(...pathInOutput: string[]): string
  absOutputByEnv?(...pathInOutput: string[]): string
  themeBuildDir?: string
  themeConfigBasename?: string
  serverPort?: number
  apiPrefixes?: string[]
  serverIndex?: string
  livereloadHost?: string
  ping?: number
  backendDest?: string
}

export const config: IConfig = {
  isInitialized: false,
}

config.root = (...pathInRoot) =>
  path.join(root, ...pathInRoot)

config.absRoot = config.root

config.source = (...pathInSource) =>
  path.join(source, ...pathInSource)

config.absSource = (...pathInSource) =>
  config.root(source, ...pathInSource)

config.building = (...pathInBuilding) =>
  path.join(building, ...pathInBuilding)

config.absBuilding = (...pathInBuilding) =>
  config.root(building, ...pathInBuilding)

config.output = (...pathInOutput) =>
  path.join(output, ...pathInOutput)

config.absOutput = (...pathInOutput) =>
  config.root(output, ...pathInOutput)

config.outputByEnv = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? output : building
  return path.join(dir, ...pathInOutput)
}

config.absOutputByEnv = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? output : building
  return config.root(dir, ...pathInOutput)
}

config.themeBuildDir       = config.source('theme', 'build')
config.themeConfigBasename = config.source('theme', 'element-config.css')

// tslint:disable-next-line complexity,max-statements
export function initialize() {

  if (config.isInitialized) {
    console.warn(`Project has already been initialized.  Newer settings will be ignored.`)
    return
  }

  // tslint:disable-next-line no-console
  console.log(`Initializing project in "${root}"`)

  config.argv = argv

  config.pkg = argv.pkg || {}

  if (typeof process.env.NODE_ENV !== 'string') {
    process.env.NODE_ENV = (argv.flags.development || DEFAULT_IS_DEVELOPMENT)
      ? 'development' : 'production'
  }
  process.env.BABEL_ENV = process.env.NODE_ENV

  // tslint:disable-next-line no-console
  console.log(`Running gulp & babel for ${process.env.NODE_ENV} environment.`)

  config.serverPort = parseInt(argv.flags.port, 10)

  config.apiPrefixes = argv.flags.prefix.split(',')

  config.serverIndex = argv.flags.index

  config.livereloadHost = argv.flags.livereload

  config.ping = parseInt(argv.flags.ping, 10)

  config.backendDest = argv.flags.backend

  config.isInitialized = true
}
