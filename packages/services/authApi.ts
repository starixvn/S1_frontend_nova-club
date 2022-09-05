import { createApi } from '@reduxjs/toolkit/query/react'
import {
  CheckUsernameQueryArgs,
  LoginQueryArgs,
  LoginResult,
  LogoutQueryArgs,
  PasswordRecoveryQeuryArgs,
  RegisterQueryArgs,
  RegisterResult,
  RegisterOtpQueryArgs,
  ForgotPasswordOtpQueryArgs,
} from './authApi.type'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import {
  ConvertResponseType,
  EndpointBuilderType,
  IResponse,
} from './common/types'

export enum AuthURL {
  LOGOUT = '/player_api/logout',
}

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */
const authEndpoints = (builder: EndpointBuilderType) => {
  return {
    login: builder.mutation<IResponse<LoginResult>, LoginQueryArgs>({
      query: ({ username, password }) => ({
        url: `/player_api/login`,
        data: {
          username,
          password,
        },
      }),
    }),
    register: builder.mutation<IResponse<RegisterResult>, RegisterQueryArgs>({
      query: (queryArgs) => ({
        url: `/player_api/createPlayer`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    checkUsername: builder.query<IResponse<string>, CheckUsernameQueryArgs>({
      query: ({ username }) => ({
        url: `/player_api/checkUsername`,
        data: {
          username,
        },
      }),
    }),
    logout: builder.query<IResponse<string>, LogoutQueryArgs>({
      query: ({ username }) => ({
        url: `${AuthURL.LOGOUT}`,
        data: {
          username,
        },
      }),
    }),
    sendRegistrationOtp: builder.mutation<
      IResponse<{ verify_code: string }>,
      RegisterOtpQueryArgs
    >({
      query: ({ contactNumber, username }) => ({
        url: `/player_api/sendRegistrationOtp`,
        data: {
          contactNumber,
          username,
        },
      }),
    }),
    sendPasswordRecoveryOtp: builder.mutation<
      IResponse<{ verify_code: string }>,
      ForgotPasswordOtpQueryArgs
    >({
      query: ({ contactNumber }) => ({
        url: `/player_api/passwordRecoveryOtp`,
        data: {
          contactNumber,
        },
      }),
    }),
    passwordRecovery: builder.mutation<
      IResponse<undefined>,
      PasswordRecoveryQeuryArgs
    >({
      query: ({ contactNumber, cpassword, password, verify_code }) => ({
        url: `/player_api/passwordRecovery`,
        data: {
          contactNumber,
          cpassword,
          password,
          verify_code,
        },
      }),
    }),
  }
}

/**
 * `endpoints` has to rewrite here for proper typescript inference
 */
const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...authEndpoints(builder),
  }),
})

export default authApi
export { authEndpoints }
export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyCheckUsernameQuery,
  useCheckUsernameQuery,
  useSendRegistrationOtpMutation,
  useSendPasswordRecoveryOtpMutation,
  usePasswordRecoveryMutation,
} = authApi

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
      invalidatesTags: ['Register'],
      transformResponse: (resp: IResponse<RegisterResult>) => {
        return resp
      },
    },
  },
})

// const { useLoginQuery: useLoginQueryTag } = addTagAuthApi
