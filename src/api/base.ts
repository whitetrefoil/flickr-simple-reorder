import ky, { Options } from 'ky';


interface RawResponse<T> {
  code: number;
  data: T|string;
}


export class ApiError extends Error {
  constructor(public code: number, message: string, public nested?: Error) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class NetworkError extends Error {
  constructor(public nested?: Error) {
    super(nested?.message ?? 'network error');
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}


const api = ky.create({
  prefixUrl      : '/api',
  headers        : {
    'content-type': 'application/json',
  },
  retry          : 1,
  timeout        : 10000,
  cache          : 'no-cache',
  throwHttpErrors: false,
});


const request = async <RES = unknown>(url: string, options?: Options): Promise<RES> => {
  let res: Response;

  try {
    res = await api(url, options);
  } catch (e) {
    throw new NetworkError(e);
  }

  if (res == null) {
    throw new NetworkError();
  }

  const json: RawResponse<RES> = await res.json();

  if (!res.ok || json.code == null || json.code > 299) {
    throw new ApiError(res.status, json.data as string || res.statusText);
  }

  return json.data as RES;
};

export const get = async <RES = unknown>(url: string, options?: Options): Promise<RES> =>
  request(url, {
    method: 'get',
    ...options,
  });

export const post = async <RES = unknown>(url: string, options?: Options): Promise<RES> =>
  request(url, {
    method: 'post',
    ...options,
  });
