import { createApi } from '@reduxjs/toolkit/query/react'
import {
  LoginQueryArgs,
  LoginResult,
  RegisterQueryArgs,
  RegisterResult,
} from './authApi.type'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import {
  ConvertResponseType,
  EndpointBuilderType,
  IResponse,
} from './common/types'

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
    register: builder.query<IResponse<RegisterResult>, RegisterQueryArgs>({
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
export const { useLazyLoginQuery, useLazyRegisterQuery } = authApi

/**
 * For Demo differrent use cases
 */

/**
 * Use this as a way to enhance endpoints for additional features
 */
const dummyAuthApi = authApi as ConvertResponseType<
  typeof authApi,
  'endpoints',
  {
    login: string
  }
>

const addTagAuthApi = dummyAuthApi.enhanceEndpoints({
  addTagTypes: ['Login', 'Register'],
  endpoints: {
    login: {
      transformResponse: (resp: string) => {
        return resp
      },
    },
    register: {
      providesTags: ['Register'],
      transformResponse: (resp: IResponse<RegisterResult>) => {
        return resp
      },
    },
  },
})

// const { useLoginQuery: useLoginQueryTag } = addTagAuthApi
