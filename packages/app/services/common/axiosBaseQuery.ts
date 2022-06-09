import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from './axiosInstance'
import { IResponse } from './types'

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
      // return {
      //   error: {
      //     code: -999,
      //     message: 'common.systemError',
      //     success: false,
      //   },
      // }

      return {
        error: e.response.data,
      }
    }
  }
}
