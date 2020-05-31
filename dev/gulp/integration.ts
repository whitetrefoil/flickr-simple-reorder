import { parallel, task } from 'gulp';

import './backend';
import './dev-server';

task('integration', parallel('devServer', 'backend:proxy'));
task('integration:recorder', parallel('devServer', 'backend:recorder'));
