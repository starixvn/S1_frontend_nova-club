import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { ChangePasswordResult, ChangePasswordArgs } from './changePassword.type'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  CreateTransferPinArgs,
  RecoverPinArgs,
  UpdateTransferPinArgs,
} from './pinApi.type'

const pinEndpoints = (builder: EndpointBuilderType) => {
  return {
    createTransferPin: builder.mutation<
      IResponse<string>,
      CreateTransferPinArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/transferPin`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    updateTransferPin: builder.mutation<
      IResponse<string>,
      UpdateTransferPinArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/transferPin`,
        method: 'PUT',
        data: {
          ...queryArgs,
        },
      }),
    }),
    transferPinRecovery: builder.mutation<IResponse<string>, RecoverPinArgs>({
      query: (queryArgs) => ({
        url: `/player_api/transferPinRecovery`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    transferPinRecoveryOtp: builder.mutation<IResponse<string>, object>({
      query: (queryArgs) => ({
        url: `/player_api/transferPinRecoveryOtp`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
  }
}

const pinApi = createApi({
  reducerPath: 'pinApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...pinEndpoints(builder),
  }),
})

export default pinApi
export { pinEndpoints }
export const {
  useUpdateTransferPinMutation,
  useCreateTransferPinMutation,
  useTransferPinRecoveryMutation,
  useTransferPinRecoveryOtpMutation,
} = pinApi
