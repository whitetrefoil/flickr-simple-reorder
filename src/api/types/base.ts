// tslint:disable:no-console

import Axios from 'axios'


export interface IResponse<T> {
  code: number
  devMessage?: object
  data: T
}


export const axios = Axios.create({
  baseURL: '/api/',
  timeout: 10000,
})
