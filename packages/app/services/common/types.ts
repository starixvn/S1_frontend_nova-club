import { createApi } from '@reduxjs/toolkit/query/react'

export type CreateApiParamType = Parameters<typeof createApi>[0]
export type EndpointBuilderType = Parameters<CreateApiParamType['endpoints']>[0]

export interface IResponse<T = void> {
  result?: T
  code: number
  message: string
  success: boolean
}
