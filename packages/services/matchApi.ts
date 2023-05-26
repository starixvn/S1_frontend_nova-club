import {
  EntityState,
  EntityStateAdapter,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import { MatchResult } from './matchApi.type'
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
    getRecoMatch: builder.query<MatchResult[], void>({
      query: () => ({
        url: `/static_api/getRecoMatch`,
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
const selectMatchData = createSelector(selectMatch, (resp) => resp.data)
const matchGroupByLeague = createSelector(
  (r) => selectMatchData(r),
  (matches) => {
    const entities = groupBy(matches, 'LeagueId')
    console.log('entities', entities)
    return {
      ids: Object.keys(entities),
      entities,
    }
  }
)

export const { selectAll: selectAllLeague, selectById: selectLeagueById } =
  leagueAdapter.getSelectors((state) => matchGroupByLeague(state))

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
