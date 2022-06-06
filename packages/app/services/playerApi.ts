import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import { ProfileQueryArgs, ProfileResult } from './playerApi.type'

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
export const { usePlayerProfileQuery, useLazyPlayerProfileQuery } = playerApi
