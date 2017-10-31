// tslint:disable:no-import-side-effect no-implicit-dependencies

jest.resetModules()

import * as _ from 'lodash'
import { compare } from 'semver'
import { compare as myCompare } from '../../src/services/version'

function testVersion(a: string, b: string) {
  let myResult: number
  let myCompareThrown: string
  let officialResult: number
  let officialCompareThrown: string

  try {
    myResult = myCompare(a, b)
  } catch (e) {
    myCompareThrown = e.message
  }

  try {
    officialResult = compare(a, b)
  } catch (e) {
    officialCompareThrown = e.message
  }

  if (_.isUndefined(myCompareThrown) !== _.isUndefined(officialCompareThrown)) {
    throw new Error(`My comparator did${myCompareThrown ? ' ' : ' **NOT** '}thrown but the official one did${officialCompareThrown ? '' : ' **NOT**'}.\nError message: ${myCompareThrown || officialCompareThrown}`)
  }

  expect(myResult).toEqual(officialResult)
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
    testVersion(null, undefined)
  })
})
