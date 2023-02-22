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
    { method = 'POST', _config = {}, url = '', ...axiosConfig },
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
        ...axiosConfig,
      })

      const { code } = respData
      if (url.startsWith('/player_api/getGameList'))
        console.log('respData', url, respData.data.length)
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
            if (errorObj.statusCode === 405) {
              errorObj.message = 'maintenance'
            } else if (errorObj.statusCode === 404) {
              // 404 we flag as forbidden, as infra team block the request at CDN and return 404 with HTML string
              errorObj.statusCode = 403
            }
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
