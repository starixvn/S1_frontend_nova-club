import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { agentAxiosInstance } from './agentAxiosInstance'

export interface IResponse<T = void> {
  result?: IResponseResult<T>
  message: string
  success: boolean
  statusCode?: number
}

export interface IResponseResult<T = void> {
  data: T
  draw?: number
  recordsFiltered?: number
  recordsTotal?: number
}

export function agentAxiosBaseQuery<T>(): BaseQueryFn<
  AxiosRequestConfig,
  IResponse<T>,
  IResponse<T>
> {
  return async (
    { method = 'POST', _config = {}, url = '', ...axiosConfig },
    { signal }
  ) => {
    try {
      const { data: respData } = await agentAxiosInstance.request<
        never,
        AxiosResponse<IResponse<T>>
      >({
        url,
        method,
        signal,
        _config,
        ...axiosConfig,
      })

      if (respData.success) {
        return { data: respData }
      }

      return { error: respData }
    } catch (error) {
      console.error('axiosBaseQuery error', url, error)

      if (axios.isAxiosError(error)) {
        let errorMessage = error.response?.data as undefined | IResponse<T>

        if (errorMessage) {
          errorMessage.statusCode = error.response?.status
          return {
            error: errorMessage,
          }
        }
      }

      return {
        error: {
          code: -999,
          message: error.message === '' ? 'status.systemError' : error.message,
          success: false,
        },
      }
    }
  }
}
