import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  DeleteMessageQueryArgs,
  Message,
  MessageDetailsArgs,
  MessageDetailsResult,
  MessageResult,
} from './messageApi.type'

const messageApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    message: builder.query<Message[], void>({
      query: () => ({
        url: `/player_api/v1/message`,
        method: 'POST',
      }),
      transformResponse: (r: IResponse<MessageResult>) => {
        return r.data?.rows || []
      },
      providesTags: ['Message'],
    }),
    messageDetails: builder.mutation<
      IResponse<MessageDetailsResult>,
      MessageDetailsArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/messageDetails`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['Message'],
    }),
    deleteMessages: builder.mutation<IResponse, DeleteMessageQueryArgs>({
      query: ({ isDeleteAll, ids }) => ({
        url: `/player_api/v1/message`,
        method: 'DELETE',
        data: {
          delete_all: isDeleteAll,
          message_ids: ids,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
})

export const {
  useMessageQuery,
  useMessageDetailsMutation,
  useDeleteMessagesMutation,
} = messageApi
