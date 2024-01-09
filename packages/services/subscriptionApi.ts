import { NOTIFICATION_SERVICE_API } from '@env'
import { baseApiWithTag } from './baseApi'
import { EndpointBuilderType } from './common/types'
import {
  SubscribeArgs,
  SubscribeResult,
  SubscribeToTopicArgs,
  UnsubscribeArgs,
} from './subscription.type'

export const subscriptionApi = baseApiWithTag.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder: EndpointBuilderType) => ({
    subscribe: builder.mutation<SubscribeResult, SubscribeArgs>({
      query: (queryArgs) => ({
        url: '/subscriptions/subscribe',
        baseURL: NOTIFICATION_SERVICE_API,
        method: 'POST',
        data: { ...queryArgs },
      }),
    }),
    unsubscribe: builder.mutation<SubscribeResult, UnsubscribeArgs>({
      query: (queryArgs) => ({
        url: '/subscriptions/unsubscribe',
        baseURL: NOTIFICATION_SERVICE_API,
        method: 'POST',
        data: { ...queryArgs },
      }),
    }),
    subscribeTopic: builder.mutation<SubscribeResult, SubscribeToTopicArgs>({
      query: (queryArgs) => ({
        url: '/subscriptions/subscribeToTopic',
        baseURL: NOTIFICATION_SERVICE_API,
        method: 'POST',
        data: { ...queryArgs },
      }),
    }),
  }),
})

export const {
  useSubscribeMutation,
  useUnsubscribeMutation,
  useSubscribeTopicMutation,
} = subscriptionApi
