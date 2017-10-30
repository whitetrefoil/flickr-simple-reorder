/**
 * This is a very light-weight version of semver comparision.
 */
export function myCompare(a: string, b: string): -1|0|1 {
  // TODO
  const arrA = a.match(/(\d+)\.(\d+)\.(\d+)(?:-)/)
  const arrB = b.split('.')
  for (let i = 0; i < a.length; i += 1) {
    if (arrA[i] < arrB[i]) { return -1 }
    if (arrA[i] > arrB[i]) { return 1 }
    if (arrA[i] == null && arrB[i] == null) { return 0 }
    if (arrA[i] == null) { return -1 }
    if (arrB[i] == null) { return 1 }
  }
}
