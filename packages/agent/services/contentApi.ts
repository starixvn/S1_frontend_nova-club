import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'
import {
  AnnouncementDetailArgs,
  AnnouncementDetailResult,
  AnnouncementItem,
  AnnouncementResult,
  ContentList,
  MessageDetailArgs,
  MessageDetailResult,
  MessageItem,
  MessageResult,
} from './contentApi.type'

export const contentApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    announcement: builder.query<ContentList<AnnouncementItem>, void>({
      query: () => ({
        url: `/user/announcement`,
        data: {
          start: 0,
          length: 25,
        },
      }),
      transformResponse: ({ result }: { result: AnnouncementResult }) => {
        return {
          list: result?.data ?? [],
          total: result?.recordsTotal ?? 0,
        }
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
    message: builder.query<ContentList<MessageItem>, void>({
      query: () => ({
        url: `/user/message`,
        data: {
          start: 0,
          length: 25,
        },
      }),
      transformResponse: ({ result }: { result: MessageResult }) => {
        return {
          list: result?.data ?? [],
          total: result?.recordsTotal ?? 0,
        }
      },
    }),
    messageDetail: builder.query<
      IResponse<MessageDetailResult>,
      MessageDetailArgs
    >({
      query: (query) => ({
        url: `/user/messageDetail`,
        method: 'POST',
        data: {
          ...query,
        },
      }),
    }),
  }),
})

export const {
  useAnnouncementQuery,
  useLazyAnnouncementDetailQuery,
  useMessageQuery,
  useLazyMessageDetailQuery,
} = contentApi
