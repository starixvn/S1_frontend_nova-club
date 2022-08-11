import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'
import { DeleteMessageQueryArgs, MessageResult } from './messageApi.type'

const messageEndpoints = (builder: EndpointBuilderType) => {
  return {
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
  }
}

const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...messageEndpoints(builder),
  }),
})

export default messageApi
export { messageEndpoints }
export const { useMessageQuery, useDeleteMessagesMutation } = messageApi
