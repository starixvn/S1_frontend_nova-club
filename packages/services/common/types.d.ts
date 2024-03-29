import {
  Api,
  MutationDefinition,
  QueryDefinition,
} from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

declare module 'axios' {
  interface AxiosRequestConfig {
    _config?: { isStaticApi: boolean }
  }
}

export type CreateApiParamType = Parameters<typeof createApi>[0]
export type EndpointBuilderType = Parameters<CreateApiParamType['endpoints']>[0]

export interface IResponse<T = void> {
  data?: T
  code: number
  message: string
  success: boolean
  statusCode?: number
}

export interface DefaultParams {
  locale: string
  currency: string
}

export type SelectOptions = {
  value: string
  label: string
  icon?: string
}

export type RowData<T> = {
  rows: T[]
  row_count_total: number
}
