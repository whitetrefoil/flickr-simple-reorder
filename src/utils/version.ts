/**
 * This is a very light-weight version of semver comparision.
 */

const VERSION_PATTERN = /^(\d+)\.(\d+)\.(\d+)(?:-(.*))?$/

export function compare(a: string, b: string): -1|0|1 {
  if (typeof a !== 'string') {
    throw new TypeError(`Invalid Version: ${a}`)
  }
  if (typeof b !== 'string') {
    throw new TypeError(`Invalid Version: ${b}`)
  }

  const arrA = a.match(VERSION_PATTERN)
  const arrB = b.match(VERSION_PATTERN)

  if (arrA == null) {
    throw new TypeError(`Invalid Version: ${a}`)
  }
  if (arrB == null) {
    throw new TypeError(`Invalid Version: ${b}`)
  }

  for (let i = 1; i < arrA.length; i += 1) {
    if (arrA[i] < arrB[i]) { return -1 }
    if (arrA[i] > arrB[i]) { return 1 }
    if (arrA[i] == null && arrB[i] == null) { return 0 }
    if (arrA[i] == null) { return 1 }
    if (arrB[i] == null) { return -1 }
  }

  return 0
}
