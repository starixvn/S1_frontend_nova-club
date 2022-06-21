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
    playerProfile: builder.query<IResponse<ProfileResult>, ProfileQueryArgs>({
      query: ({ username }) => ({
        url: `/player_api/getPlayerProfile`,
        method: 'POST',
        data: {
          username,
        },
      }),
    }),
    playerOverview: builder.query<IResponse<OverviewResult>, OverviewArgs>({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerOverview`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: (res: IResponse<OverviewResult>): OverviewResult => {
        return res.data
      },
    }),
    playerReport: builder.query<IResponse<ReportResult>, ReportArgs>({
      query: (queryArgs) => ({
        url: `/player_api/getPlayerReport`,
        method: 'POST',
        data: {
          ...queryArgs,
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
  useLazyPlayerProfileQuery,
  usePlayerOverviewQuery,
  usePlayerReportQuery,
} = playerApi
