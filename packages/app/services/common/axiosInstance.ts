import { API_DOMAIN, API_KEY } from '@env'
import { EnhancedStore } from '@reduxjs/toolkit'
import { generateFPSParams } from 'app/utils/fps/fpsGenerator'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

enum RESPONSE_STATUS {
  TOKEN_EXPIRED = 401,
}

const DEFAULT_TIMEOUT = 15000

interface CustomConfig {
  store?: EnhancedStore
  onTokenExpired?: () => void
  onUnauthorizedAccess?: () => void
}

let customConfig: CustomConfig = {}

export const configureAxios = (newConfig: CustomConfig) => {
  customConfig = {
    ...customConfig,
    ...newConfig,
  }
}

const axiosInstance = axios.create({
  baseURL: `${API_DOMAIN}`,
  timeout: DEFAULT_TIMEOUT,
})

const onRequestFullfilled = (config: AxiosRequestConfig) => {
  type RequestParams = {
    black_b?: string
    username?: string
  } & ReturnType<typeof generateFPSParams>

  let { url, headers } = config
  const requestParams: RequestParams = {} as RequestParams

  if (!url?.includes('/static_api')) {
    const state = customConfig.store?.getState()
    const { token, playerName } = state.player?.currentLoginInfo || {}
    if (token) {
      if (config.headers === undefined) config.headers = {}
      config.headers['Authorization'] = `Bearer ${token}`
    }

    if (playerName) {
      if ('username' in config.data === false) {
        requestParams.username = playerName
      }
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

const onResponseFullfilled = (response: AxiosResponse) => {
  return response
}

const onResponseError = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === RESPONSE_STATUS.TOKEN_EXPIRED) {
      const currentLoginInfo =
        customConfig.store?.getState().player.currentLoginInfo

      if (currentLoginInfo) {
        customConfig.onTokenExpired?.()
      } else {
        customConfig.onUnauthorizedAccess?.()
      }
    }
  }

  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(onRequestFullfilled, onRequestError)
axiosInstance.interceptors.response.use(onResponseFullfilled, onResponseError)

export { axiosInstance }
