import { baseApiWithTag } from './baseApi'
import { ChangePasswordArgs, ChangePasswordResult } from './changePassword.type'
import { EndpointBuilderType, IResponse } from './common/types'

const changePasswordApi = baseApiWithTag.injectEndpoints({
  endpoints: (builder: EndpointBuilderType) => ({
    changePassword: builder.mutation<
      IResponse<ChangePasswordResult>,
      ChangePasswordArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/v1/password`,
        method: 'PUT',
        data: {
          ...queryArgs,
        },
      }),
    }),
  }),
})

export const { useChangePasswordMutation } = changePasswordApi
