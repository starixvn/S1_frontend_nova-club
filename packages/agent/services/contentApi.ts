import { EndpointBuilderType } from 'services/common/types'
import { BankAccountItem, LookUpBank } from './accountApi.type'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  AnnouncementDetailArgs,
  AnnouncementDetailResult,
  AnnouncementItem,
  AnnouncementResult,
} from './contentApi.type'

export const contentApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    announcement: builder.query<AnnouncementItem[], void>({
      query: () => ({
        url: `/user/announcement`,
        data: {
          start: 0,
          length: 25,
        },
      }),
      transformResponse: ({ result }: { result: AnnouncementResult }) => {
        return result?.data ?? []
      },
    }),
    announcementDetail: builder.query<
      IResponse<AnnouncementDetailResult>,
      AnnouncementDetailArgs
    >({
      query: (query) => ({
        url: `/user/announcementDetail`,
        method: 'POST',
        data: {
          ...query,
        },
      }),
    }),
  }),
})

export const { useAnnouncementQuery, useLazyAnnouncementDetailQuery } =
  contentApi
