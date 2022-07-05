import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  OverviewArgs,
  OverviewResult,
  ProfileQueryArgs,
  ProfileResult,
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
    playerOverview: builder.query<OverviewResult | undefined, void>({
      query: () => ({
        url: `/player_api/getPlayerOverview`,
        method: 'POST',
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
} = playerApi
