import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
})

export const baseApiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: [
    'Balance',
    'PlayerBank',
    'Report',
    'Announcement',
    'PredictCount',
    'CNYSpinBalance',
    'TicketBalance',
    'PlayerProfile',
    'RecoMatches',
    'Message',
    'Coin',
    'CheckInProgress',
  ],
})
