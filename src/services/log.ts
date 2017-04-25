// tslint:disable:no-console
import * as debug from 'debug'
import * as chalk from 'chalk'

// "Chalk" use one single number to identify the color
// which is actually the last digit of color control in shell.
const COLOR_FN = [
  chalk.black,   // \e[30m Black
  chalk.red,     // \e[31m Red
  chalk.green,   // \e[32m Green
  chalk.yellow,  // \e[33m Yellow
  chalk.blue,    // \e[34m Blue
  chalk.magenta, // \e[35m Magenta
  chalk.cyan,    // \e[36m Cyan
]

class Log {
  debug: debug.IDebugger

  info(...messages: any[]): void {
    let mainMessage = `${chalk.green.inverse('INF')} ${COLOR_FN[this.debug.color].bold(this.name)} [${new Date().toISOString()}] ${messages[0]}`
    if (messages.length > 1) {
      mainMessage += '\n'
    }
    console.log.apply(console, [mainMessage, ...messages.slice(1)])
  }

  warn(...messages: any[]): void {
    let mainMessage = `${chalk.yellow.inverse('WAR')} ${COLOR_FN[this.debug.color].bold(this.name)} [${new Date().toISOString()}] ${messages[0]}`
    if (messages.length > 1) {
      mainMessage += '\n'
    }
    console.log.apply(console, [mainMessage, ...messages.slice(1)])
  }

  error(...messages: any[]): void {
    let mainMessage = `${chalk.red.inverse('ERR')} ${COLOR_FN[this.debug.color].bold(this.name)} [${new Date().toISOString()}] ${messages[0]}`
    if (messages.length > 1) {
      mainMessage += '\n'
    }
    console.log.apply(console, [mainMessage, ...messages.slice(1)])
  }

  constructor(private name: string) {
    this.debug = debug(name)
    this.debug.log = console.log.bind(console)
  }
}

export const getLogger = function getLogger(name: string): Log {
  return new Log(name)
}
