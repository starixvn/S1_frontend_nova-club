import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  OverviewArgs,
  OverviewResult,
  OverviewSummaryResult,
  PlayerLangArgs,
  PlayerOverviewArgs,
  ProfileQueryArgs,
  ProfileResult,
  ProfileUpdateArgs,
  ReportArgs,
  ReportResult,
} from './playerApi.type'

const playerEndpoints = (builder: EndpointBuilderType) => {
  return {
    playerProfile: builder.query<IResponse<ProfileResult>, void>({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerProfile`,
        method: 'POST',
      }),
    }),
    sendUpdateProfileOTP: builder.mutation<IResponse<string>, void>({
      query: (queryArgs) => ({
        url: `/player_api/updateRealNameOtp`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation<
      IResponse<ProfileResult>,
      ProfileUpdateArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/playerProfile`,
        method: 'PUT',
        data: {
          ...queryArgs,
        },
      }),
      async onQueryStarted(
        { field, value, ...patch },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled
          if (data.code == 0) {
            dispatch(
              playerApi.util.updateQueryData(
                'playerProfile',
                undefined,
                (draft) => {
                  if (draft.data) {
                    Object.assign(draft.data, { [field]: value })
                    console.log(
                      'Profile Data Pessimistically updated to : ',
                      draft.data
                    )
                  }
                }
              )
            )
          }
        } catch {}
      },
    }),
    playerOverview: builder.query<
      OverviewResult | undefined,
      PlayerOverviewArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerOverview`,
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
        url: `/player_api/getPlayerOverviewSummary`,
        method: 'POST',
      }),
    }),
    playerReport: builder.query<
      IResponse<ReportResult> | undefined,
      ReportArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerReport`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    playerLang: builder.mutation<string, PlayerLangArgs>({
      query: ({ lang }) => ({
        url: `/player_api/lang`,
        method: 'PUT',
        data: {
          lang,
        },
      }),
    }),
  }
}

const playerApi = createApi({
  reducerPath: 'playerApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...playerEndpoints(builder),
  }),
})

export default playerApi
export { playerEndpoints }
export const {
  usePlayerProfileQuery,
  usePlayerReportQuery,
  usePlayerOverviewQuery,
  usePlayerOverviewSummaryQuery,
  useLazyPlayerProfileQuery,
  useLazyPlayerReportQuery,
  usePlayerLangMutation,
  useUpdateProfileMutation,
  useSendUpdateProfileOTPMutation,
} = playerApi
