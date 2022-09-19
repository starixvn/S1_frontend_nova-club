import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  CreateTransferPinArgs,
  RecoverPinArgs,
  UpdateTransferPinArgs,
} from './pinApi.type'

const pinApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
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
  }),
})

export const {
  useUpdateTransferPinMutation,
  useCreateTransferPinMutation,
  useTransferPinRecoveryMutation,
  useTransferPinRecoveryOtpMutation,
} = pinApi
