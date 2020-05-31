// tslint:disable:no-import-side-effect no-implicit-dependencies

import { LogLevel } from '@whitetrefoil/log-utils';
// Babel Polyfill
// Refer to: https://babeljs.io/docs/en/next/babel-preset-env.html#usebuiltins
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  require('preact/debug');
  Error.stackTraceLimit = Infinity;
  window.__LOG_LEVEL__ = LogLevel.Debug;
}
