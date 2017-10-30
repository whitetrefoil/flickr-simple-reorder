// tslint:disable:no-implicit-dependencies no-import-side-effect

import Chalk from 'chalk'
import * as _ from 'lodash'
import * as meow from 'meow'
import * as path from 'path'
import { getLogger } from './utils/log'

// region - Interfaces

interface IFlags {
  development: boolean
  port: string
  prefix: string
  index: string
  livereload: string
  ping: string
  backend: string
}

interface IMeowResult extends meow.Result {
  flags: IFlags
}

type IBuildPathFn = (...path: string[]) => string

interface IConfig {
  argv: IMeowResult
  pkg: any
  serverPort: number
  apiPrefixes: string[]
  serverIndex: string
  livereloadHost: string
  ping: number
  backendDest: string

  root: IBuildPathFn
  absRoot: IBuildPathFn
  source: IBuildPathFn
  absSource: IBuildPathFn
  building: IBuildPathFn
  absBuilding: IBuildPathFn
  output: IBuildPathFn
  absOutput: IBuildPathFn
  outputByEnv: IBuildPathFn
  absOutputByEnv: IBuildPathFn
}

// endregion

// region - Default constants

const DEFAULT_IS_DEVELOPMENT = false
const DEFAULT_PORT           = 8000
const DEFAULT_PREFIX         = '/api/'
const DEFAULT_INDEX          = 'index.html'
const DEFAULT_PING           = 0
const DEFAULT_LIVERELOAD     = 'localhost'
const DEFAULT_BACKEND        = 'http://localhost:3000'

const DEFAULT_BUILDING_DIR    = '.building'
const DEFAULT_OUTPUT_DIR      = 'dist'
const DEFAULT_SOURCE_BASE_DIR = 'src'

// endregion

const logger = getLogger(__filename)

// region - Configure Meow

const argv = meow(
  `
    Usage:
      $ npm run gulp ${Chalk.yellow('<task>')} -- ${Chalk.yellow('<options>')}
    or:
      $ ./node_modules/.bin/gulp ${Chalk.yellow('<task>')} ${Chalk.yellow('<options>')}
    or (if have npx installed):
      $ npx gulp ${Chalk.yellow('<task>')} ${Chalk.yellow('<options>')}
    or (if have gulp installed globally):
      $ gulp ${Chalk.yellow('<task>')} ${Chalk.yellow('<options>')}

    Options:                                                     [${Chalk.gray('default value')}]
      common:
        -h, --help         show this help message
        -d, --development  Set NODE_ENV to "development"         [${Chalk.yellow('false')}]
      developing:
        -p, --port         port of preview server                [${Chalk.blue('8888')}]
        -x, --prefix       prefix to determine backend requests  [${Chalk.green('"/api/"')}]
                           can use ',' to specify multiple ones
        -i, --index        index page of preview server          [${Chalk.green('"index.html"')}]
        -l, --livereload   the hostname in livereload script     [${Chalk.green('"localhost"')}]
        -n, --ping         emulate the network delay (ms)        [${Chalk.blue('0')}]
        -e, --backend      destination of backend proxy          [${Chalk.green('"http://localhost:3000"')}]

    For more detail of tasks / options, see code in "dev/gulp" directory.
  `,
  {
    boolean: ['help', 'development'],
    string : ['index', 'prefix', 'livereload', 'ping', 'backend'],
    alias  : {
      h: 'help',
      d: 'development',
      p: 'port',
      x: 'prefix',
      i: 'index',
      l: 'livereload',
      n: 'ping',
      e: 'backend',
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
) as IMeowResult

export class ConfigNotInitializedError extends Error {
  isConfigNotInitializedError = true
}

// endregion

// region - Main exports

const rootDir     = path.join(__dirname, '..')
const sourceDir   = DEFAULT_SOURCE_BASE_DIR
const buildingDir = DEFAULT_BUILDING_DIR
const outputDir   = DEFAULT_OUTPUT_DIR

if (typeof process.env.NODE_ENV !== 'string') {
  process.env.NODE_ENV = (argv.flags.development || DEFAULT_IS_DEVELOPMENT)
    ? 'development' : 'production'
}
process.env.BABEL_ENV = process.env.NODE_ENV

logger.log(`Initializing project in "${rootDir}" for ${process.env.NODE_ENV} environment.`)

const root: IBuildPathFn = (...pathInRoot) => path.join(rootDir, ...pathInRoot)
const absRoot            = root

const source: IBuildPathFn    = (...pathInSource) => path.join(sourceDir, ...pathInSource)
const absSource: IBuildPathFn = (...pathInSource) => root(sourceDir, ...pathInSource)

const building: IBuildPathFn    = (...pathInBuilding) => path.join(buildingDir, ...pathInBuilding)
const absBuilding: IBuildPathFn = (...pathInBuilding) => root(buildingDir, ...pathInBuilding)

const output: IBuildPathFn    = (...pathInOutput) => path.join(outputDir, ...pathInOutput)
const absOutput: IBuildPathFn = (...pathInOutput) => root(outputDir, ...pathInOutput)

const outputByEnv: IBuildPathFn = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? outputDir : buildingDir
  return path.join(dir, ...pathInOutput)
}

const absOutputByEnv: IBuildPathFn = (...pathInOutput) => {
  const dir = process.env.NODE_ENV === 'production' ? outputDir : buildingDir
  return root(dir, ...pathInOutput)
}

const config: IConfig = {
  argv,
  pkg           : argv.pkg || {},
  serverPort    : parseInt(argv.flags.port, 10),
  apiPrefixes   : argv.flags.prefix.split(','),
  serverIndex   : argv.flags.index,
  livereloadHost: argv.flags.livereload,
  ping          : parseInt(argv.flags.ping, 10),
  backendDest   : _.isEmpty(argv.flags.backend) ? DEFAULT_BACKEND : argv.flags.backend,
  root,
  absRoot,
  source,
  absSource,
  building,
  absBuilding,
  output,
  absOutput,
  outputByEnv,
  absOutputByEnv,
}

// endregion

export default config
