import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import {
  LoginQueryArgs,
  LoginResult,
  ResetPwArgs,
  ResetPwSendOtpArgs,
} from './authApi.type'
import { IResponse } from './common/agentAxiosBaseQuery'

export const authApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    login: builder.mutation<IResponse<LoginResult>, LoginQueryArgs>({
      query: ({ username, password }) => ({
        url: '/login',
        data: {
          username,
          password,
        },
      }),
    }),
    resetPwSendOtp: builder.mutation<IResponse<void>, ResetPwSendOtpArgs>({
      query: (queryArgs) => ({
        url: '/forgetPw/sendOtp',
        data: { ...queryArgs },
      }),
    }),
    resetPw: builder.mutation<IResponse<LoginResult>, ResetPwArgs>({
      query: (queryArgs) => ({
        url: '/forgetPw/resetPw',
        data: { ...queryArgs },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useResetPwMutation,
  useResetPwSendOtpMutation,
} = authApi
