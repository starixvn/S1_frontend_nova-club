import {
  CheckUsernameQueryArgs,
  ForgotPasswordOtpQueryArgs,
  LoginQueryArgs,
  LoginResult,
  LogoutQueryArgs,
  PasswordRecoveryQeuryArgs,
  RegisterOtpQueryArgs,
  RegisterQueryArgs,
  RegisterResult,
  UpdateShieldQueryArgs,
} from './authApi.type'
import { baseApiWithTag } from './baseApi'
import { AuthURL } from './common/axiosInstance'
import { EndpointBuilderType, IResponse } from './common/types'

// export enum AuthURL {
//   LOGOUT = '/player_api/v1/logout',
// }

/**
 * @param builder Pass builder from `createApi` *endpoints*
 */

export const authApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    login: builder.mutation<IResponse<LoginResult>, LoginQueryArgs>({
      query: ({ username, password }) => ({
        url: `/player_api/v1/login`,
        data: {
          username,
          password,
        },
      }),
    }),
    register: builder.mutation<IResponse<RegisterResult>, RegisterQueryArgs>({
      query: (queryArgs) => ({
        url: `/player_api/v1/createPlayer`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    checkUsername: builder.query<IResponse<string>, CheckUsernameQueryArgs>({
      query: ({ username }) => ({
        url: `/player_api/v1/checkUsername`,
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
      query: (queryArgs) => ({
        url: `/player_api/v1/sendRegistrationOtp`,
        data: { ...queryArgs },
      }),
    }),
    sendPasswordRecoveryOtp: builder.mutation<
      IResponse<{ verify_code: string }>,
      ForgotPasswordOtpQueryArgs
    >({
      query: ({ contactNumber }) => ({
        url: `/player_api/v1/passwordRecoveryOtp`,
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
        url: `/player_api/v1/passwordRecovery`,
        data: {
          contactNumber,
          cpassword,
          password,
          verify_code,
        },
      }),
    }),
    updateShield: builder.mutation<IResponse<void>, UpdateShieldQueryArgs>({
      query: ({ action_type, platform, session_id }) => ({
        url: `/player_api/v1/updateShield`,
        data: {
          action_type,
          platform,
          session_id,
        },
      }),
    }),
    // banner: builder.query<BannerResult[], void>({
    //   query: () => ({
    //     url: `https://static-stage.gball8.com/nvclub/nova-club/content/banners/banner.json?v=13`,
    //     method: 'GET',
    //   }),
    // }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyCheckUsernameQuery,
  useCheckUsernameQuery,
  useSendRegistrationOtpMutation,
  useSendPasswordRecoveryOtpMutation,
  usePasswordRecoveryMutation,
  useUpdateShieldMutation,
} = authApi

/**
 * For Demo differrent use cases
 */

/**
 * Use this as a way to enhance endpoints for additional features
 */
// const dummyAuthApi = authApi as ConvertResponseType<
//   typeof authApi,
//   'endpoints',
//   {
//     login: string
//   }
// >

// const addTagAuthApi = dummyAuthApi.enhanceEndpoints({
//   addTagTypes: ['Login', 'Register'],
//   endpoints: {
//     login: {
//       transformResponse: (resp: string) => {
//         return resp
//       },
//     },
//     register: {
//       invalidatesTags: ['Register'],
//       transformResponse: (resp: IResponse<RegisterResult>) => {
//         return resp
//       },
//     },
//   },
// })

// const { useLoginQuery: useLoginQueryTag } = addTagAuthApi
