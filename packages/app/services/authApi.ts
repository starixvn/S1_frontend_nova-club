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
