import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
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
    } catch (error) {
      console.error('axiosBaseQuery error', error)

      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data as undefined | IResponse<T>

        if (errorMessage) {
          return {
            error: errorMessage,
          }
        }
      }

      return {
        error: {
          code: -999,
          message: error.message === '' ? 'common.systemError' : error.message,
          success: false,
        },
      }
    }
  }
}
