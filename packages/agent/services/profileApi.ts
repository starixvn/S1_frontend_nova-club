import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import { partnerApi } from './partnerApi'
import {
  PartnerCreatePinArgs,
  PartnerCreatePinResult,
  PartnerResetPinArgs,
  PartnerVerifyTransferPinArgs,
  PartnerVerifyTransferPinResult,
  ProfileBalanceArgs,
  ProfileBalanceResult,
  ProfileDetailArgs,
  ProfileDetailResult,
  ProfileGetEarnPtArgs,
  ProfileGetEarnPtResult,
  ProfileQrResult,
  ProfileUpdatePtArgs,
} from './profileApi.type'
import { NewEarnPercentage } from './shareholderApi.type'

export const profileApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    profileQr: builder.query<IResponse<ProfileQrResult>, void>({
      query: () => ({
        url: `/profile/qr`,
      }),
    }),
    profileDetail: builder.query<IResponse<ProfileDetailResult>, void>({
      query: () => ({
        url: `/profile/detail`,
        method: 'POST',
      }),
      providesTags: ['Profile'],
    }),
    profileBalance: builder.query<
      IResponse<ProfileBalanceResult>,
      ProfileBalanceArgs
    >({
      query: (queryArgs) => ({
        url: `/profile/balance`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    profileCreatePin: builder.mutation<
      IResponse<PartnerCreatePinResult>,
      PartnerCreatePinArgs
    >({
      query: (queryArgs) => ({
        url: `/profile/createPin`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    profileResetPin: builder.mutation<IResponse<[]>, PartnerResetPinArgs>({
      query: (queryArgs) => ({
        url: `/profile/resetPin`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    profileVerifyTransferPin: builder.mutation<
      IResponse<PartnerVerifyTransferPinResult>,
      PartnerVerifyTransferPinArgs
    >({
      query: (queryArgs) => ({
        url: `/profile/verifyTransferPin`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),

    profileNewEarnPt: builder.query<NewEarnPercentage, void>({
      query: () => ({
        url: '/profile/earnPercNew',
      }),
      transformResponse: (resp: IResponse<NewEarnPercentage>) => {
        return resp.result?.data as NewEarnPercentage
      },
    }),
    profileGetEarnPt: builder.query<
      ProfileGetEarnPtResult,
      ProfileGetEarnPtArgs
    >({
      query: (queryArgs) => ({
        url: `/profile/earnPercEdit`,
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: (res: IResponse<ProfileGetEarnPtResult>) => {
        return res.result?.data as ProfileGetEarnPtResult
      },
    }),
    profileUpdatePt: builder.mutation<IResponse<void>, ProfileUpdatePtArgs>({
      query: (queryArgs) => ({
        url: `/profile/updatePt`,
        data: {
          ...queryArgs,
        },
      }),
      async onQueryStarted(
        { id, currency },
        { dispatch, queryFulfilled, getState }
      ) {
        const { originalArgs } = partnerApi.endpoints.partnerList.select()(
          getState()
        )

        const patchResult = dispatch(
          partnerApi.util.updateQueryData(
            'partnerList',
            originalArgs,
            (draft) => {
              let selected = draft?.result?.data.find((el) => el.id === id)
              if (selected) {
                const currencyParams = Object.keys(currency)
                if (currencyParams != null && currencyParams.length > 0)
                  selected.earning_perc =
                    currency[currencyParams[0] as string].EARNP
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['ShareholderList'],
    }),
  }),
})

export const {
  useProfileQrQuery,
  useProfileDetailQuery,
  useProfileBalanceQuery,
  useLazyProfileBalanceQuery,
  useProfileCreatePinMutation,
  useProfileResetPinMutation,
  useProfileVerifyTransferPinMutation,
  useProfileNewEarnPtQuery,
  useProfileGetEarnPtQuery,
  useProfileUpdatePtMutation,
} = profileApi
