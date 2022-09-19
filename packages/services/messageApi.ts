import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType, IResponse } from './common/types'
import { DeleteMessageQueryArgs, MessageResult } from './messageApi.type'

const messageApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    message: builder.query<IResponse<MessageResult>, void>({
      query: (queryArgs) => ({
        url: `/player_api/message`,
        method: 'POST',
      }),
    }),
    deleteMessages: builder.mutation<IResponse, DeleteMessageQueryArgs>({
      query: ({ isDeleteAll, ids }) => ({
        url: `/player_api/message`,
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

export const { useMessageQuery, useDeleteMessagesMutation } = messageApi
