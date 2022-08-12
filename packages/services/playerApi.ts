import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  OverviewArgs,
  OverviewResult,
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
    playerProfile: builder.query<
      IResponse<ProfileResult>,
      ProfileQueryArgs | void
    >({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerProfile`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
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
    playerReport: builder.query<ReportResult | undefined, ReportArgs>({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerReport`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: (
        res: IResponse<ReportResult>
      ): ReportResult | undefined => {
        return res.data
      },
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
  useLazyPlayerProfileQuery,
  useLazyPlayerReportQuery,
  usePlayerLangMutation,
  useUpdateProfileMutation,
  useSendUpdateProfileOTPMutation,
} = playerApi
