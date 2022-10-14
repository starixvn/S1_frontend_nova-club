// https://world-cup-json-2022.fly.dev/matches
import { DEV_DOMAIN } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Platform } from 'react-native'
import { Match } from './matchApi.type'

export const matchApi = createApi({
  reducerPath: 'matchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Platform.OS === 'web' ? '/' : DEV_DOMAIN,
  }),
  endpoints: (builder) => ({
    matches: builder.query<Match[], void>({
      query: () => ({
        url: `/assets/wc.json`,
      }),
    }),
  }),
})

export const { useMatchesQuery } = matchApi
