import { AGENT_API_DOMAIN } from '@env'
import { EnhancedStore } from '@reduxjs/toolkit'
import { AGENT_LANGUAGE_CODE } from 'agent/constant/language'
import { RootState } from 'app/provider/redux/store'
import { LANGUAGE_CODE } from 'utils/constant'
import { getFpsParams } from 'utils/fps/fpsGenerator'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export enum AuthURL {
  // AGENT LOGOUT URL TOBE INSERTED
  LOGOUT = '/player_api/logout',
}

enum RESPONSE_STATUS {
  SUCCESS = 200,
  TOKEN_EXPIRED = 401,
  RESTRICTED = 403,
  API_NOT_FOUND = 404,
  ERROR = 500,
}

const DEFAULT_TIMEOUT = 25000

interface CustomConfig {
  store?: EnhancedStore<RootState>
  onTokenExpired?: () => Promise<void>
}

let customConfig: CustomConfig = {}

export const configureAgentAxios = (newConfig: CustomConfig) => {
  customConfig = {
    ...customConfig,
    ...newConfig,
  }
}
// const isUsingRootDomain = Platform.OS === 'web' && !__DEV__
const isUsingRootDomain = false

const agentAxiosInstance = axios.create({
  baseURL: `${isUsingRootDomain ? '/api/nv88_api' : AGENT_API_DOMAIN}`,
  timeout: DEFAULT_TIMEOUT,
  transformRequest: [
    (data, headers) => {
      if (headers?.post && data) {
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
  } & ReturnType<typeof getFpsParams>

  let { url, headers, baseURL, data } = config
  const requestParams: RequestParams = {} as RequestParams
  const state = customConfig?.store?.getState()

  if (headers === undefined) headers = {}

  if (
    baseURL &&
    baseURL?.startsWith(AGENT_API_DOMAIN) &&
    url?.startsWith('/')
  ) {
    const { access_token } = state?.agent || {}
    if (access_token) {
      headers['Authorization'] = `Bearer ${access_token}`
    }

    console.log(`Request ${url} : `, data)
  }

  // IOS 13.3 added security where GET request should not have body data ( use query param instead)
  // if config.data is {} on GET method , ios will reject as well.
  // ref: https://stackoverflow.com/a/56973866
  if (
    typeof window !== 'undefined' &&
    (data || (requestParams && Object.keys(requestParams).length > 0))
  ) {
    if (data instanceof FormData) {
      for (const param in requestParams) {
        config.data.append(param, requestParams[param])
      }
    } else {
      data = {
        ...config.data,
        ...requestParams,
      }
    }
  }

  // After login, backend will be using `locale` selected in `playerProfile` api
  const currentLocale = state?.setting.locale || LANGUAGE_CODE.VIETNAM
  // header only accept en | vn, hence replace vi into vn
  headers['Accept-Language'] =
    currentLocale === LANGUAGE_CODE.VIETNAM
      ? AGENT_LANGUAGE_CODE.VIETNAM
      : currentLocale

  return config
}

const onRequestError = (error: any) => {
  console.error(error)
  return Promise.reject(error)
}

const onResponseFullfilled = (response: AxiosResponse) => {
  console.log(`Response ${response.config.url} :`, response.data)
  return response
}

const onResponseError = (error: AxiosError) => {
  try {
    if (error.response) {
      switch (error.response.status) {
        case RESPONSE_STATUS.TOKEN_EXPIRED:
          // handle remove token and redirect to login page
          customConfig.onTokenExpired?.()
          break
        case RESPONSE_STATUS.RESTRICTED:
          console.log('Permission not allowed!')
          break
        case RESPONSE_STATUS.API_NOT_FOUND:
          console.log("Page doesn't exist!")
          break
        case RESPONSE_STATUS.ERROR:
          console.log('Something Wrong!')
          break
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    return Promise.reject(error)
  }
}

agentAxiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
agentAxiosInstance.defaults.headers.put['Content-Type'] = 'application/json'
agentAxiosInstance.interceptors.request.use(onRequestFullfilled, onRequestError)
agentAxiosInstance.interceptors.response.use(
  onResponseFullfilled,
  onResponseError
)

export { agentAxiosInstance }
