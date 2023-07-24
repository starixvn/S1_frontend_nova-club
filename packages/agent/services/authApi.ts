import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import {
  AgentCheckUsername,
  AgentRegisterResult,
  LoginQueryArgs,
  LoginResult,
  RegisterArgs,
  ResetPwArgs,
  ResetPwSendOtpArgs,
} from './authApi.type'
import { IResponse } from './common/agentAxiosBaseQuery'
import { RegisterResult } from 'services/authApi.type'

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
    agentCheckUsername: builder.query<IResponse<string>, AgentCheckUsername>({
      query: ({ username }) => ({
        url: `/agent/checkUsername`,
        data: {
          username,
        },
      }),
    }),
    agentRegister: builder.mutation<
      IResponse<AgentRegisterResult>,
      RegisterArgs
    >({
      query: (queryArgs) => ({
        url: '/agent/register',
        data: { ...queryArgs },
      }),
    }),
    agentRegisterOtp: builder.mutation<IResponse<void>, ResetPwSendOtpArgs>({
      query: (queryArgs) => ({
        url: '/agent/registerOtp',
        data: { ...queryArgs },
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
  useLazyAgentCheckUsernameQuery,
  useAgentRegisterMutation,
  useAgentRegisterOtpMutation,
  useResetPwMutation,
  useResetPwSendOtpMutation,
} = authApi
