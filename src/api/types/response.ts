import { Response } from 'superagent'

export interface IResponse<DataType> {
  res: Response,
  data: DataType
}

export type IResponseXHR<DataType> = Promise<IResponse<DataType>>
