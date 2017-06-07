import Axios         from 'axios'
import { getLogger } from './log'

const ENDPOINT = 'https://api.flickr.com/services/rest/'

const { debug } = getLogger('/services/api.ts')

export const axios = Axios.create({
  baseURL     : ENDPOINT,
  responseType: 'json',
  headers     : {
    'Content-Type': 'multipart/form-data',
  },
})

export const request = async(data: any): Promise<any> => {
  try {
    const res = await axios.post('', data)

    if (res.data == null || res.data.stat !== 'ok') {
      const err = new Error('Flickr responded an error')
      err['response'] = res
      throw err
    }

    return res
  } catch (e) {
    debug('Failed to request:', e)

    if (e.response != null) {
      if (e.response.data != null && e.response.data.message != null) {
        throw e.response.data.message
      }

      if (!(e.response.status >= 200 && e.response.status < 400)) {
        throw e.response.statusText
      }
    }

    if (e.message != null) { throw e.message }

    throw 'Unknown error'
  }
}
