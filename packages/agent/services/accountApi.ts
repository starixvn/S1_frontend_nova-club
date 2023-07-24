import { EndpointBuilderType } from 'services/common/types'
import {
  AddBankAccount,
  AddBankAccountArgs,
  BankAccountItem,
  DeleteBankAccount,
  DeleteBankAccountArgs,
  LookUpBank,
  SendOtpArgs,
} from './accountApi.type'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'

export const accountApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    bankAccountList: builder.query<IResponse<BankAccountItem[]>, void>({
      query: () => ({
        url: `/account/list`,
        data: {
          start: 0,
          length: 25,
        },
      }),
      providesTags: ['BankAccount'],
    }),
    lookupBankCode: builder.query<IResponse<LookUpBank>, void>({
      query: () => ({
        url: `/account/new/lookup/bank_info`,
        data: {
          currency: 'VND',
        },
      }),
    }),
    addBankAccount: builder.mutation<
      IResponse<AddBankAccount>,
      AddBankAccountArgs
    >({
      query: (queryArgs) => ({
        url: `/account/new`,
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['BankAccount', 'UserInfo', 'Profile'],
    }),
    sendOTP: builder.mutation<IResponse<undefined>, SendOtpArgs>({
      query: (queryArgs) => ({
        url: `/account/sendOtp`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    deleteBankAccount: builder.mutation<
      IResponse<DeleteBankAccount>,
      DeleteBankAccountArgs
    >({
      query: (queryArgs) => ({
        url: `/account/delete`,
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['BankAccount'],
    }),
  }),
})

export const {
  useBankAccountListQuery,
  useLookupBankCodeQuery,
  useAddBankAccountMutation,
  useSendOTPMutation,
  useDeleteBankAccountMutation,
} = accountApi
// /app_api/account/sendOtp
