import * as md5 from 'blueimp-md5'
import * as _   from 'lodash'

export const apiKey    = '5cdc0f5ec9c28202f1098f615edba5cd'
export const apiSecret = 'e3b842e3b923b0fb'
export const perms     = 'write'

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
  })

  const apiSig = calculateSig(paramsWithJson, secret)

  const formData = new FormData()

  _.forOwn(paramsWithJson, (v, k) => {
    formData.append(k, v)
  })
  formData.append('api_sig', apiSig)

  return formData
}
