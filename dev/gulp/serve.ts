// tslint:disable:no-import-side-effect no-implicit-dependencies

import { parallel, series, task } from 'gulp'

import './backend'
import './dev-server'
import './pre-check'

task('serve', series('preCheck', parallel('devServer', 'backend')))
