/**
 * This is a very light-weight version of semver comparision.
 */

const VERSION_PATTERN = /(\d+)\.(\d+)\.(\d+)(?:-(.*))/

export function myCompare(a: string, b: string): -1|0|1 {
  // TODO
  const arrA = a.match(VERSION_PATTERN)
  const arrB = b.match(VERSION_PATTERN)
  for (let i = 1; i < arrA.length; i += 1) {
    if (arrA[i] < arrB[i]) { return -1 }
    if (arrA[i] > arrB[i]) { return 1 }
    if (arrA[i] == null && arrB[i] == null) { return 0 }
    if (arrA[i] == null) { return -1 }
    if (arrB[i] == null) { return 1 }
  }
}
