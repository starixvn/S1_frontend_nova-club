import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from './axiosInstance'
import { IResponse } from './types'

export function axiosBaseQuery<T>(): BaseQueryFn<
  AxiosRequestConfig,
  IResponse<T>,
  IResponse<T>
> {
  return async (
    { method = 'POST', _config = {}, url = '', baseURL, ...axiosConfig },
    { signal }
  ) => {
    try {
      const { data: respData } = await axiosInstance.request<
        never,
        AxiosResponse<IResponse<T>>
      >({
        url,
        method,
        signal,
        // @ts-expect-error: Custom `_config` used only in interceptor
        _config,
        baseURL,
        ...axiosConfig,
      })

      const { code } = respData

      if (code) {
        console.log('returning error')
        return {
          error: respData,
        }
      }

      return { data: respData }
    } catch (error) {
      console.error('axiosBaseQuery error', url, JSON.stringify(error))
      let errorObj: IResponse<T> = {
        code: -999,
        message: error.message === '' ? 'status.systemError' : error.message,
        success: false,
        statusCode: error.response?.status,
      }

      if (axios.isAxiosError(error)) {
        let errorMessage = error.response?.data

        if (errorMessage) {
          // if HTML string
          if (typeof errorMessage === 'string') {
            errorObj.message = 'maintenance'
          } else {
            Object.assign(errorObj, errorMessage)
          }
        }
      }

      return {
        error: errorObj,
      }
    }
  }
}
