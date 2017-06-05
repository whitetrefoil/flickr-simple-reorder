import * as md5      from 'blueimp-md5'
import * as _        from 'lodash'
import { getLogger } from '../services/log'

export const apiKey    = process.env.FLICKR_KEY || '5cdc0f5ec9c28202f1098f615edba5cd'
export const apiSecret = process.env.FLICKR_SECRET || 'e3b842e3b923b0fb'
export const perms     = 'write'

const { debug } = getLogger('/store/helpers.ts')

export const calculateSig = <T extends object>(
  params: T,
  secret: string = apiSecret,
): string => {

  let paramStr = secret

  const keys = _.keys(params).sort()

  _.forOwn(keys, (k) => {
    paramStr += k + params[k]
  })

  return md5(paramStr)
}

export const composeFormData = <T extends object>(
  params: T,
  secret: string = apiSecret,
): FormData => {
  const paramsWithJson = _.defaults(params, {
    format        : 'json',
    nojsoncallback: '1',
  }) as object

  const apiSig = calculateSig(paramsWithJson, secret)

  const formData = new FormData()

  _.forOwn(paramsWithJson, (v, k) => {
    formData.append(k, v)
  })
  formData.append('api_sig', apiSig)

  debug('Composed form data:', { ...paramsWithJson, api_sig: apiSig })

  return formData
}
