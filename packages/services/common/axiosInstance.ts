import { API_DOMAIN, API_KEY, MEDIA_DOMAIN } from '@env'
import { EnhancedStore } from '@reduxjs/toolkit'
import { LANGUAGE_CODE } from 'app/constant/language'
import { RootState } from 'app/provider/redux/store'
import { generateFPSParams } from 'app/utils/fps/fpsGenerator'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

enum RESPONSE_STATUS {
  TOKEN_EXPIRED = 401,
}

const DEFAULT_TIMEOUT = 25000

interface CustomConfig {
  store?: EnhancedStore<RootState>
  onTokenExpired?: () => void
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
  transformRequest: [
    (data, headers) => {
      if (headers && data) {
        const contentType = headers.post['Content-Type']?.toLowerCase()

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

const onRequestFullfilled = (config: AxiosRequestConfig) => {
  type RequestParams = {
    black_b?: string
    username?: string
  } & ReturnType<typeof generateFPSParams>

  let { url, headers, baseURL } = config
  const requestParams: RequestParams = {} as RequestParams
  const state = customConfig.store?.getState()

  if (config.headers === undefined) config.headers = {}

  if (baseURL && baseURL?.startsWith(API_DOMAIN) && url?.startsWith('/')) {
    const { token, playerName } = state?.auth.info || {}
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    if (
      playerName &&
      config.method?.toLowerCase() !== 'get' &&
      !config._config?.isStaticApi
    ) {
      if (!config.data || 'username' in config.data === false) {
        requestParams.username = playerName
      }
    }

    config.headers = {
      ...headers,
      api_key: API_KEY,
    }

    console.log(`Request ${config.url} : `, config.data)
  }

  // const cacheControlNeeded = ['/player_api/transfer']
  // if (cacheControlNeeded.includes(url!)) {
  //   config.headers['Cache-Control'] = 'no-cache'
  // }

  const fraudDetectionNeeded = ['/player_api/createPlayer', '/player_api/login']

  if (fraudDetectionNeeded.includes(url!)) {
    headers = {
      ...headers,
      'Content-Type': 'application/json',
    }

    Object.assign(requestParams, generateFPSParams())

    try {
      const black_b = window.IGLOO?.getBlackbox?.()?.blackbox
      requestParams.black_b = black_b
    } catch (e) {
      console.error(e, 'Failed to retrieve blackbox')
    }
  }

  // IOS 13.3 added security where GET request should not have body data ( use query param instead)
  // if config.data is {} on GET method , ios will reject as well.
  // ref: https://stackoverflow.com/a/56973866
  if (config.data || (requestParams && Object.keys(requestParams).length > 0)) {
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
  const currentLocale = state?.setting.locale || LANGUAGE_CODE.VIETNAM
  config.headers['X-Lang'] = currentLocale

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
      const state = customConfig.store?.getState()
      const currentLoginInfo = state?.auth.info

      if (currentLoginInfo) {
        customConfig.onTokenExpired?.()
      }
    }
  }

  return Promise.reject(error)
}

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
axiosInstance.defaults.headers.put['Content-Type'] = 'application/json'
axiosInstance.interceptors.request.use(onRequestFullfilled, onRequestError)
axiosInstance.interceptors.response.use(onResponseFullfilled, onResponseError)

export { axiosInstance }
