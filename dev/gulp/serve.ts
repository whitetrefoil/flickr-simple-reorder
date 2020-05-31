import { parallel, task } from 'gulp';

import './backend';
import './dev-server';

task('serve', parallel('devServer', 'backend:stubapi'));
