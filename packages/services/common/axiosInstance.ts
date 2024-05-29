import { API_DOMAIN, API_KEY } from '@env'
import { EnhancedStore } from '@reduxjs/toolkit'
import { RootState } from 'app/provider/redux/store'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { LANGUAGE_CODE } from 'utils/constant'
import { getUserAgent } from 'utils/deviceInfo'
import { appendFpsParams, getFpsParams } from 'utils/fps/fpsGenerator'

// const API_DOMAIN = 'https://stage.gball8.com/api/nv88_api'
// const API_KEY = 'zl9oo0vtrtbih1fufvq8pk8stvqprad8'

export enum AuthURL {
  LOGOUT = '/player_api/v1/logout',
}

enum RESPONSE_STATUS {
  TOKEN_EXPIRED = 401,
}

const DEFAULT_TIMEOUT = 25000

interface CustomConfig {
  store?: EnhancedStore<RootState>
  onTokenExpired?: () => Promise<void>
}

let customConfig: CustomConfig = {}

export const configureAxios = (newConfig: CustomConfig) => {
  customConfig = {
    ...customConfig,
    ...newConfig,
  }
}
const isUsingRootDomain = typeof window !== 'undefined' && !__DEV__
const _baseURL = `${isUsingRootDomain ? '/api/nv88_api' : API_DOMAIN}`
// const isUsingRootDomain = false

const axiosInstance = axios.create({
  baseURL: _baseURL,
  timeout: DEFAULT_TIMEOUT,
  transformRequest: [
    (data, headers) => {
      if (headers && data) {
        const contentType = headers['Content-Type']
        switch (contentType) {
          case 'multipart/form-data': {
            const body = new FormData()
            Object.keys(data).map((k) => {
              body.append(k, data[k])
            })
            // console.log('body', Object.fromEntries(body))
            return body
          }
        }
      }

      return JSON.stringify(data)
    },
  ],
})

const onRequestFullfilled = async (config: AxiosRequestConfig) => {
  type RequestParams = {
    black_b?: string
    username?: string
    currency?: string
  } & Partial<ReturnType<typeof getFpsParams>>

  let { url, headers, baseURL } = config
  const requestParams: RequestParams = {} as RequestParams
  const state = customConfig.store?.getState()
  if (config.headers === undefined) config.headers = {}

  if (baseURL && baseURL?.startsWith(_baseURL) && url?.startsWith('/')) {
    const { token, playerName } = state?.auth.info || {}
    const { deviceId } = state?.tempSetting || {}
    const currency = state?.setting.currency

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    /* append device id */
    if (deviceId) {
      config.headers['device_id'] = deviceId
    }
    /* */

    if (
      playerName &&
      config.method?.toLowerCase() !== 'get' &&
      !config._config?.isStaticApi
    ) {
      if (!config.data || 'username' in config.data === false) {
        requestParams.username = playerName
      }
    }
    if (currency) {
      if (
        config.method?.toLowerCase() !== 'get' &&
        (!config.data || 'currency' in config.data === false)
      ) {
        requestParams.currency = currency
      }
    }

    config.headers = {
      ...headers,
      api_key: API_KEY,
    }

    console.log(`Request ${config.url} : `, config.data)
  }

  // const cacheControlNeeded = ['/player_api/v1/transfer']
  // if (cacheControlNeeded.includes(url!)) {
  //   config.headers['Cache-Control'] = 'no-cache'
  // }

  /** FRAUD DETECTION (No longer using IOVATION) */
  // const fraudDetectionNeeded = ['/player_api/v1/createPlayer', '/player_api/v1/login']

  // if (fraudDetectionNeeded.includes(url!)) {
  //   headers = {
  //     ...headers,
  //     'Content-Type': 'application/json',
  //   }

  //   Object.assign(requestParams, generateFPSParams())

  //   try {
  //     const black_b = window.IGLOO?.getBlackbox?.()?.blackbox
  //     requestParams.black_b = black_b
  //   } catch (e) {
  //     console.error(e, 'Failed to retrieve blackbox')
  //   }
  // }
  /** FRAUD DETECTION */
  appendFpsParams(url, requestParams)

  // IOS 13.3 added security where GET request should not have body data ( use query param instead)
  // if config.data is {} on GET method , ios will reject as well.
  // ref: https://stackoverflow.com/a/56973866
  if (
    typeof window !== 'undefined' &&
    (config.data || (requestParams && Object.keys(requestParams).length > 0))
  ) {
    if (config.data instanceof FormData) {
      for (const param in requestParams) {
        config.data.append(param, requestParams[param])
      }
    } else {
      config.data = {
        ...config.data,
        ...requestParams,
      }
    }
  }

  // After login, backend will be using `locale` selected in `playerProfile` api

  // const currentLocale = state?.setting.locale ?? LANGUAGE_CODE.VIETNAM
  config.headers['X-Lang'] = state?.setting.locale ?? LANGUAGE_CODE.VIETNAM

  const userAgent = await getUserAgent()
  if (userAgent) config.headers['X-Useragent'] = userAgent

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
  try {
    if (error.response) {
      if (error.response.status === RESPONSE_STATUS.TOKEN_EXPIRED) {
        const state = customConfig.store?.getState()
        const currentLoginInfo = state?.auth.info

        if (currentLoginInfo && error.config.url !== AuthURL.LOGOUT) {
          customConfig.onTokenExpired?.()
        }
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    return Promise.reject(error)
  }
}

axiosInstance.defaults.headers.get['Content-Type'] = 'application/json'
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
axiosInstance.defaults.headers.put['Content-Type'] = 'application/json'
axiosInstance.interceptors.request.use(onRequestFullfilled, onRequestError)
axiosInstance.interceptors.response.use(onResponseFullfilled, onResponseError)

export { axiosInstance }
