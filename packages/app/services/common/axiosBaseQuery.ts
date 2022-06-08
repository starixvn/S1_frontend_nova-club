import { API_DOMAIN, API_KEY } from '@env'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IResponse } from './types'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { generateFPSParams } from 'app/utils/fps/fpsGenerator'
import { store } from 'app/provider/redux/store'

const DEFAULT_TIMEOUT = 15000

const axiosInstance = axios.create({
  baseURL: `${API_DOMAIN}`,
  timeout: DEFAULT_TIMEOUT,
})

const onRequestFullfilled = (config: AxiosRequestConfig) => {
  type RequestParams = {
    black_b: string
  } & ReturnType<typeof generateFPSParams>

  let { url, headers } = config
  const requestParams: RequestParams = {} as RequestParams

  if (!url?.includes('/static_api')) {
    const state = store.getState()
    const token = state.player?.currentLoginInfo?.token
    if (token) {
      if (config.headers === undefined) config.headers = {}
      config.headers.common!['Authorization'] = `Bearer ${token}`
    }
  }

  const fraudDetectionNeeded = ['/player_api/createPlayer', '/player_api/login']

  if (fraudDetectionNeeded.includes(url!)) {
    headers = {
      ...headers,
      'Content-Type': 'application/json',
    }

    Object.assign(requestParams, generateFPSParams())

    try {
      const black_b = window.IGLOO?.getBlackbox().blackbox
      requestParams.black_b = black_b
    } catch (e) {
      console.log('Failed to retrieve blackbox')
    }
  }

  config.headers = {
    ...headers,
    api_key: API_KEY,
  }
  config.data = {
    ...config.data,
    ...requestParams,
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
