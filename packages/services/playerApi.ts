import { Currency } from 'utils/constant'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  EligibleSpinArgs,
  EligibleSpinResult,
  FreeSpinResult,
  LuckySpinArgs,
  MEMBER_TYPE,
  OverviewResult,
  OverviewSummaryResult,
  PlayerLangArgs,
  PlayerOverviewArgs,
  PlayerRealNameArgs,
  ProfileResult,
  ProfileUpdateArgs,
  ReportArgs,
  // ReportArgs,
  ReportResult,
  RetentionSpinArgs,
} from './playerApi.type'
import { walletApi } from './walletApi'

export const playerApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    playerProfile: builder.query<IResponse<ProfileResult>, void>({
      query: (queryArgs) => ({
        url: `/player_api/v1/getPlayerProfile`,
        method: 'POST',
      }),
      providesTags: ['PlayerProfile'],
    }),
    sendUpdateProfileOTP: builder.mutation<IResponse<string>, void>({
      query: (queryArgs) => ({
        url: `/player_api/v1/updateRealNameOtp`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation<
      IResponse<ProfileResult>,
      ProfileUpdateArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/playerProfile`,
        method: 'PUT',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['PlayerProfile'],
    }),
    playerOverview: builder.query<
      OverviewResult | undefined,
      PlayerOverviewArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getPlayerOverview`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: (
        res: IResponse<OverviewResult>
      ): OverviewResult | undefined => {
        return res.data
      },
    }),
    playerOverviewSummary: builder.query<
      IResponse<OverviewSummaryResult> | undefined,
      void
    >({
      query: () => ({
        url: `/player_api/v1/getPlayerOverviewSummary`,
        method: 'POST',
      }),
    }),
    playerReport: builder.query<
      IResponse<ReportResult> | undefined,
      ReportArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getPlayerReport`,
        method: 'POST',
        headers: { 'X-Lang': 'en' },
        data: {
          ...queryArgs,
        },
      }),
      providesTags: ['Report'],
    }),
    playerLang: builder.mutation<string, PlayerLangArgs>({
      query: ({ lang }) => ({
        url: `/player_api/v1/lang`,
        method: 'PUT',
        data: {
          lang,
        },
      }),
    }),
    eligibleSpin: builder.query<
      IResponse<EligibleSpinResult>,
      EligibleSpinArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/getEligibleEvents`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    luckySpin: builder.mutation<IResponse<LuckySpinArgs>, void>({
      query: (queryArgs) => ({
        url: `/player_api/v1/registerFreeWheelSpin`,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          setTimeout(() => {
            dispatch(dispatch(walletApi.util.invalidateTags(['Balance'])))
          }, 6000)
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
    retentionSpin: builder.mutation<
      IResponse<LuckySpinArgs>,
      RetentionSpinArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/retentionFreeWheelSpin`,
        method: 'POST',
        data: { ...queryArgs },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          setTimeout(() => {
            dispatch(dispatch(walletApi.util.invalidateTags(['Balance'])))
          }, 6000)
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
    // soon to be deprecated, use eligibleSpin to get register spin balance
    freeSpin: builder.query<IResponse<FreeSpinResult>, void>({
      query: () => ({
        url: `/player_api/v1/getRegisterFreeWheelSpin`,
        method: 'POST',
      }),
    }),
    playerRealName: builder.mutation<IResponse, PlayerRealNameArgs>({
      query: (queryArgs) => ({
        url: `/player_api/v1/playerRealName`,
        method: 'PUT',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['PlayerProfile'],
    }),
    onlineCheck: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: `/player_api/v1/onlineCheck`,
        method: 'POST',
      }),
    }),
  }),
})

type PlayerProfileQuerySubscriptionOptions = Parameters<
  typeof playerApi.usePlayerProfileQuery
>[1]

export const usePlayerProfileQuery = (
  _: void,
  options?: PlayerProfileQuerySubscriptionOptions
) => {
  return playerApi.usePlayerProfileQuery(undefined, {
    ...options,
    selectFromResult: (s) => {
      return {
        ...s,
        data: s.data?.data,
        username: s.data?.data?.username,
        currency: s.data?.data?.currency as Currency,
        isCreditMember: s.data?.data?.member_type === MEMBER_TYPE.CREDIT,
      }
    },
  })
}

export const {
  usePlayerReportQuery,
  usePlayerOverviewQuery,
  usePlayerOverviewSummaryQuery,
  useLazyPlayerProfileQuery,
  useLazyPlayerReportQuery,
  usePlayerLangMutation,
  useUpdateProfileMutation,
  useSendUpdateProfileOTPMutation,
  useLuckySpinMutation,
  useRetentionSpinMutation,
  useLazyFreeSpinQuery,
  useLazyEligibleSpinQuery,
  useEligibleSpinQuery,
  usePlayerRealNameMutation,
  useOnlineCheckMutation,
} = playerApi
