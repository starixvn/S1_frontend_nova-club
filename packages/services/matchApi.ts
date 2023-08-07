import {
  EntityState,
  EntityStateAdapter,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import { League, MatchResult } from './matchApi.type'
import dayjs from 'dayjs'
import groupBy from 'lodash/groupBy'

const matchAdapter = createEntityAdapter<MatchResult>({
  selectId: (match) => match.EventId,
  sortComparer: (a, b) =>
    dayjs(a.globalshowtime, 'MM/DD hh:mm a').unix() -
    dayjs(b.globalshowtime, 'MM/DD hh:mm a').unix(),
})

export const matchApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    getRecoMatch: builder.query<MatchResult[], { isApp: boolean }>({
      query: ({ isApp }) => ({
        url: `/static_api/getRecoMatchV2/${isApp ? 1 : 0}`,
        method: 'GET',
      }),
      transformResponse: (responseData: IResponse<MatchResult[]>) => {
        return (
          responseData.data?.sort(
            (a, b) =>
              dayjs(a.globalshowtime, 'MM/DD hh:mm a').unix() -
              dayjs(b.globalshowtime, 'MM/DD hh:mm a').unix()
          ) ?? []
        )
      },
      providesTags: ['RecoMatches'],
    }),
  }),
})

const leagueAdapter = createEntityAdapter<MatchResult>({
  selectId: (league) => league.LeagueId,
})

export const selectMatch = matchApi.endpoints.getRecoMatch.select()
// const selectMatchData = createSelector(selectMatch, (resp) => resp.data)
export const matchGroupByLeague = createSelector(
  (r) => r.data,
  (matches) => {
    const entities = groupBy(matches, 'LeagueId')
    return {
      ids: Object.keys(entities),
      entities,
    } as EntityState<League>
  }
)

// export const { selectAll: selectAllLeague, selectById: selectLeagueById } =
//   leagueAdapter.getSelectors((state) => matchGroupByLeague(state))

// export const { selectAll: selectAllMatch, selectEntities: selectMatchEntity } =
//   matchAdapter.getSelectors((state) => selectMatchData(state) ?? initialState)

// export const selectMatchByGroup = createSelector(
//   selectAllMatch,
//   (state, groupId) => groupId,
//   (state, groupId) => {
//     console.log('state', state)
//     return state.filter((m) => m.LeagueId === groupId)
//   }
// )

export const { useGetRecoMatchQuery } = matchApi
