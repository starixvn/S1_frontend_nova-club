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
}

export type SelectOptions = {
  value: string
  label: string
}

/**
 * This type utility is used as type assertion for `enhanceEndpoints`
 * to convert the default `build.query` response result's type into the custom
 * type. This type utility is meant to solve this issue
 * https://github.com/reduxjs/redux-toolkit/issues/1441.
 *
 * 1st generic argument: Need to pass the type of `createApi`.
 *
 * 2nd generic argument: Should be always "*endpoints*" (intellisense should
 * show this). It is required for typescript to auto detect what is the declared
 * endpoints name available for used in 3rd generic argument.
 *
 * 3rd generic argument: A type object with key get from declared endpoints name
 * and value to describe what is the custom response for the endpoint.
 *
 * @example
 *
 * ```
 * const sampleApi = createApi({...})
 * const enhancedSampleApi = sampleApi as ConvertResponseType<typeof sampleApi,
 * "endpoints",
 * { name: string }
 * >
 * ```
 */
export type ConvertResponseType<
  O,
  OKey extends keyof O,
  T extends Partial<Record<keyof O[OKey], any>>
> = O extends Api<infer T1, infer Definition, infer T3, infer T4, infer T5>
  ? Definition extends Record<keyof T, any>
    ? Api<
        T1,
        Omit<Definition, keyof T> & {
          [P in keyof T]: Definition extends Record<
            P,
            QueryDefinition<infer TQ1, infer TQ2, infer TQ3, infer _, infer TQ5>
          >
            ? QueryDefinition<TQ1, TQ2, TQ3, T[P], TQ5>
            : Definition extends Record<
                P,
                MutationDefinition<
                  infer TM1,
                  infer TM2,
                  infer TM3,
                  infer _,
                  infer TM5
                >
              >
            ? MutationDefinition<TM1, TM2, TM3, T[P], TM5>
            : undefined
        },
        T3,
        T4,
        T5
      >
    : O
  : O
