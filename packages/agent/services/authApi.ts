import { EndpointBuilderType } from 'services/common/types'
import { agentBaseApiWithTag } from './agentBaseApi'
import { LoginQueryArgs, LoginResult, UserInfo } from './authApi.type'
import { IResponse } from './common/agentAxiosBaseQuery'

export const authApi = agentBaseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    login: builder.mutation<IResponse<LoginResult>, LoginQueryArgs>({
      query: ({ username, password }) => ({
        url: '/login',
        data: {
          username,
          password,
        },
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
