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
      const resp = await axiosInstance.request<
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

      const { data } = resp
      const { code } = data

      // Currently maintenance will return 200 status code , which will be treated as success
      // the response will contain maintenance page instead of JSON object.
      // consult infra to clarify
      if (typeof data === 'string') {
        return {
          error: {
            statusCode: 405,
          },
        }
      }

      if (code) {
        return { error: data }
      }

      return { data }
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

        // This maintenance checking maybe deprecated, but some api failed with string response and statuscode 400
        if (errorMessage) {
          // if HTML string
          if (typeof errorMessage === 'string') {
            errorObj.message = 'Maintenance'
            errorObj.statusCode = 405
          } else {
            Object.assign(errorObj, errorMessage)
          }
        }
      }
      if (error.message === 'Network Error') {
        errorObj.message = 'status.networkError'
      }
      return {
        error: errorObj,
      }
    }
  }
}
