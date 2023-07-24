import { EndpointBuilderType } from 'services/common/types'
import {
  AddNewAgentArgs,
  AddNewAgentResult,
  AgentCreatePinArgs,
  AgentCreatePinResult,
  AgentDetailsArgs,
  AgentDetailsResult,
  AgentListArgs,
  AgentListResult,
  AgentProfile,
  AgentReferralDetailsArgs,
  AgentReferralDetailsResult,
  AgentResetPinArgs,
  AgentSetStatusArgs,
  AgentVerifyTransferPinArgs,
  AgentVerifyTransferPinResult,
  MemberListArgs,
  MemberListResult,
} from './agentApi.type'
import { agentBaseApiWithTag } from './agentBaseApi'
import { IResponse } from './common/agentAxiosBaseQuery'

export const agentApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    agentProfile: builder.query<IResponse<AgentProfile>, void>({
      query: () => ({
        url: `/agent/profile`,
      }),
      providesTags: ['Profile'],
    }),
    agentList: builder.query<
      IResponse<AgentListResult[]> | undefined,
      AgentListArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/list`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (arg.start > 0) {
          newItems?.result?.data &&
            currentCache?.result?.data.push(...newItems.result.data)

          return currentCache
        }
        return newItems
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: ['AgentList'],
    }),
    memberList: builder.query<
      IResponse<MemberListResult[]> | undefined,
      MemberListArgs
    >({
      query: (queryArgs) => ({
        url: `/member/list`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (arg.start > 0) {
          newItems?.result?.data &&
            currentCache?.result?.data.push(...newItems.result.data)

          return currentCache
        }
        return newItems
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: ['Memberlist'],
    }),
    agentDetails: builder.query<
      IResponse<AgentDetailsResult>,
      AgentDetailsArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/detail`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    agentBalance: builder.query<
      IResponse<AgentDetailsResult>,
      AgentDetailsArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/balance`,
        method: 'POST',
        data: {
          ...queryArgs,
        },
      }),
    }),
    agentResetPin: builder.mutation<IResponse<[]>, AgentResetPinArgs>({
      query: (queryArgs) => ({
        url: `/agent/resetPin`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    addNewAgent: builder.mutation<
      IResponse<AddNewAgentResult>,
      AddNewAgentArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/new`,
        data: {
          ...queryArgs,
        },
      }),
    }),

    agentCreatePin: builder.mutation<
      IResponse<AgentCreatePinResult>,
      AgentCreatePinArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/createPin`,
        data: {
          ...queryArgs,
        },
      }),
      invalidatesTags: ['UserInfo'],
    }),
    agentVerifyTransferPin: builder.mutation<
      IResponse<AgentVerifyTransferPinResult>,
      AgentVerifyTransferPinArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/verifyTransferPin`,
        data: {
          ...queryArgs,
        },
      }),
    }),

    agentReferralDetails: builder.query<
      IResponse<AgentReferralDetailsResult>,
      AgentReferralDetailsArgs
    >({
      query: (queryArgs) => ({
        url: `/agent/qr`,
        data: {
          ...queryArgs,
        },
      }),
    }),
    agentSetStatus: builder.mutation<IResponse<void>, AgentSetStatusArgs>({
      query: (queryArgs) => ({
        url: `/agent/setStatus`,
        data: {
          ...queryArgs,
        },
      }),
      async onQueryStarted(
        { agent_id, status },
        { dispatch, queryFulfilled, getState }
      ) {
        const { originalArgs } = agentApi.endpoints.agentList.select()(
          getState()
        )

        await queryFulfilled
        dispatch(
          agentApi.util.updateQueryData('agentList', originalArgs, (draft) => {
            let selected = draft?.result?.data.find((el) => el.id === agent_id)
            if (selected) selected.active = status
          })
        )
      },
    }),
  }),
})

export const {
  useLazyAgentProfileQuery,
  useAgentProfileQuery,
  useAgentListQuery,
  useAgentDetailsQuery,
  useAgentResetPinMutation,
  useAddNewAgentMutation,
  useMemberListQuery,
  useAgentCreatePinMutation,
  useAgentVerifyTransferPinMutation,
  useAgentReferralDetailsQuery,
  useAgentBalanceQuery,
  useAgentSetStatusMutation,
} = agentApi
