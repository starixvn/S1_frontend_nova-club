import { API_DOMAIN, API_KEY } from '@env'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IResponse } from './types'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'

const DEFAULT_TIMEOUT = 15000

const axiosInstance = axios.create({
  baseURL: `${API_DOMAIN}`,
  timeout: DEFAULT_TIMEOUT,
})

const onRequestFullfilled = (config: AxiosRequestConfig) => {
  let { headers } = config

  config.headers = {
    ...headers,
    api_key: API_KEY,
  }

  return config
}

const onRequestError = (error: any) => {
  console.error(error)
  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(onRequestFullfilled, onRequestError)

export function axiosBaseQuery<T>(): BaseQueryFn<
  {
    url: string
    data?: AxiosRequestConfig['data']
    method?: AxiosRequestConfig['method']
    headers?: AxiosRequestConfig['headers']
  },
  IResponse<T>,
  IResponse<T>
> {
  return async ({ url, data, method = 'POST', headers }) => {
    try {
      const { data: respData } = await axiosInstance.request<
        never,
        AxiosResponse<IResponse<T>>
      >({
        url,
        method,
        data,
        headers,
      })
      const { code } = respData

      if (code) {
        return {
          error: respData,
        }
      }

      return { data: respData }
    } catch (e) {
      console.error('axiosBaseQuery error', e)
      return {
        error: {
          code: -999,
          message: 'common.systemError',
          success: false,
        },
      }
    }
  }
}

export { axiosInstance }
