// https://world-cup-json-2022.fly.dev/matches
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Match } from './matchApi.type'

export const matchApi = createApi({
  reducerPath: 'matchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
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
