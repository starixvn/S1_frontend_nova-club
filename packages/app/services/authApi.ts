import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  LoginQueryArgs,
  LoginResult,
  RegisterQueryArgs,
  RegisterResult,
} from './authApi.type'

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
const authEndpoints = (builder: EndpointBuilderType) => {
  return {
    login: builder.query<IResponse<LoginResult>, LoginQueryArgs>({
      query: ({ username, password }) => ({
        url: `/player_api/login`,
        data: {
          username,
          password,
        },
      }),
    }),
    register: builder.query<RegisterResult, RegisterQueryArgs>({
      query: (queryArgs) => ({
        url: `/player_api/createPlayer`,
        data: {
          ...queryArgs,
        },
      }),
    }),
  }
}

/**
 * `endpoints` has to rewrite here for proper typescript inference
 */
const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...authEndpoints(builder),
  }),
})

export default authApi
export { authEndpoints }
export const { useLoginQuery, useRegisterQuery } = authApi

/**
 * For Demo differrent use cases
 */

/**
 * Either put this `addTagAuthApi` in `apps/expo` or `apps/next`
 * or directly at here which is `authApi` above
 */
const addTagAuthApi = authApi.enhanceEndpoints({
  addTagTypes: ['Login', 'Register'],
  endpoints: {
    login: {
      providesTags: ['Login'],
      keepUnusedDataFor: 5,
    },
    register: {
      providesTags: ['Register'],
    },
  },
})

export const { useLoginQuery: useLoginQueryTag } = addTagAuthApi

/**
 * To change the response structure, make sure endpoints name do not duplicate
 * else the return response's type will consist of 2 different types union together
 * 
 * Below example changed to `login999999` to prevent duplicate endpoints name which
 * is `login` from `authApi`. 
 * If duplicate endpoints name is used, then the response's type will be a union type
 * Eg: { name: string } | IResponse<LoginResult>
 */
const transformResponseAuthApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login999999: builder.query<{ name: string }, LoginQueryArgs>({
      query: ({ username, password }) => ({
        url: `/player_api/login`,
        data: {
          username,
          password,
        },
      }),
      transformResponse: (resp): { name: string } => {
        return { name: '123' }
      },
    }),
  }),
  overrideExisting: false,
})
