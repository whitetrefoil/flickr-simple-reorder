import Axios  from 'axios'
import * as _ from 'lodash'

const ENDPOINT = 'https://api.flickr.com/services/rest/'

export const axios = Axios.create({
  baseURL     : ENDPOINT,
  responseType: 'json',
  headers     : {
    'Content-Type': 'multipart/form-data',
  },
})

export const request = (data: any) => {
  return axios.post('', data)
    .then((res) => {
      if (_.isEmpty(res.data) || res.data.stat !== 'ok') {
        return Promise.reject(res) as Promise<any>
      }
      return res
    })
}
