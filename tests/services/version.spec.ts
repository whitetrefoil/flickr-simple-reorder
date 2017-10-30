jest.resetModules()

import { compare } from 'semver'
import { myCompare } from '../../src/services/version'

function testVersion(a: string, b: string) {
  let myResult: number
  let myCompareThrown = false
  let officialResult: number
  let officialCompareThrown = false

  try {
    myResult = myCompare(a, b)
  } catch (e) {
    myCompareThrown = true
  }

  try {
    officialResult = compare(a, b)
  } catch (e) {
    officialCompareThrown = true
  }

  if (myCompareThrown !== officialCompareThrown) {
    throw new Error(`My comparator did${myCompareThrown ? ' ' : ' **NOT** '}thrown but the official one did${officialCompareThrown ? '' : ' **NOT**'}.`)
  }

  expect(myCompare(a, b)).toEqual(compare(a, b))
}

describe('Version comparator', () => {
  it('should work with pure digits', () => {
    testVersion('1.0.0', '1.0.1')
    testVersion('1.0.0', '1.0.0')
    testVersion('1.0.1', '1.0.0')
    testVersion('1.0.0', '0.99.99')
  })

  it('should work when number of sections are invalid', () => {
    testVersion('1.0.0', '1.0.0.0')
  })

  it('should work for pre-releases', () => {
    testVersion('1.0.0', '1.0.1-alpha.1')
    testVersion('1.0.0-alpha.1', '1.0.1')
    testVersion('1.0.0', '0.99.99-alpha.1')
    testVersion('1.0.1-alpha.1', '1.0.0')
    testVersion('1.0.0-alpha.2', '1.0.0-alpha.1')
    testVersion('1.0.0-alpha.2', '1.0.1-alpha.1')
    testVersion('1.0.0-beta.2', '1.0.1-alpha.1')
    testVersion('1.0.0-beta.1', '1.0.1-alpha.2')
  })

  it('should work in some wired edge cases', () => {
    testVersion('a.b.c-alpha.a', 'a.b.c-alpha.b')
    testVersion('255.255.255-alpha.a', '255.255.255-alpha.b')
    testVersion('255.255.-255-alpha.a', '255.255.-255-alpha.b')
    testVersion('255.255.255-alpha.a+asdf', '255.255.255-alpha.b+asdf')
  })
})
