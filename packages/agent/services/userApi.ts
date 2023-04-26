import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  ResetPasswordArgs,
  CreatePinOtpArgs,
  RefreshBalance,
  ResetPinOtpArgs,
  SendOtpArgs,
  UserCommissionListArgs,
  UserCommissionListResult,
  UserInfo,
  UserProfile,
  ChangePasswordArgs,
} from './userApi.type'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'

export const userApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    userInfo: builder.query<UserInfo, void>({
      query: () => ({
        url: '/user/info',
      }),
      providesTags: ['WalletAmount', 'UserInfo'],
      transformResponse: (res: IResponse<UserInfo>): UserInfo => {
        return (
          res.result?.data ?? {
            name: '-',
            role: 'agent',
            username: '-',
            wallet: {
              currency: 'VND',
              balance: 0,
            },
            has_logged_in: 1,
            has_otp: 1,
            has_pin: 1,
            mobile_no: '-',
            id: 0,
            has_verified_wd: 1,
          }
        )
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          if (data) {
            dispatch(AgentAuthActions.setAgentHasLoginBefore(data))
          }
        } catch (error) {
          console.error(error)
        }
      },
    }),
    userRefreshBalance: builder.query<IResponse<RefreshBalance>, void>({
      query: () => ({
        url: '/user/refreshBalance',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const updateBalance = dispatch(
            userApi.util.updateQueryData('userInfo', _, (draft) => {
              if (draft?.wallet) {
                // Update the balance of the user's wallet
                draft.wallet.balance = data.result?.data.balance.VND ?? 0
              }
              return draft
            })
          )
          console.log(updateBalance)
        } catch {}
      },
      providesTags: ['WalletAmount'],
    }),
    userProfile: builder.query<IResponse<UserProfile>, string>({
      query: (args) => ({
        url: `/${args}/profile`,
      }),
    }),
    userCommissionList: builder.query<
      IResponse<UserCommissionListResult[]>,
      UserCommissionListArgs
    >({
      query: (queryArgs) => ({
        url: '/user/commList',
        data: { ...queryArgs },
      }),
    }),
    resetPinOtp: builder.mutation<IResponse<[]>, ResetPinOtpArgs>({
      query: (queryArgs) => ({
        url: `/user/resetPinOtp`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    createPinOtp: builder.mutation<IResponse<[]>, CreatePinOtpArgs>({
      query: (queryArgs) => ({
        url: `/user/createPinOtp`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    resetPassword: builder.mutation<IResponse<[]>, ResetPasswordArgs>({
      query: (queryArgs) => ({
        url: '/user/resetPwd',
        data: {
          ...queryArgs,
        },
      }),
    }),
    //send otp for reset password
    resetPasswordOTP: builder.mutation<IResponse<[]>, SendOtpArgs>({
      query: (queryArgs) => ({
        url: '/user/sendOtp',
        data: {
          ...queryArgs,
        },
      }),
    }),
    changePassword: builder.mutation<IResponse<[]>, ChangePasswordArgs>({
      query: (queryArgs) => ({
        url: '/user/changePwd',
        data: {
          ...queryArgs,
        },
      }),
    }),
  }),
})

export const {
  useUserInfoQuery,
  useLazyUserInfoQuery,
  useLazyUserRefreshBalanceQuery,
  useUserProfileQuery,
  useUserCommissionListQuery,
  useLazyUserCommissionListQuery,
  useResetPinOtpMutation,
  useCreatePinOtpMutation,
  useResetPasswordMutation,
  useResetPasswordOTPMutation,
  useChangePasswordMutation,
} = userApi
