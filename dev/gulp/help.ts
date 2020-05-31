import { task } from 'gulp';
import config   from '../config';

task('help', () => {
  console.error(config.argv.help);
});
