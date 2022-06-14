import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { ChangePasswordResult, ChangePasswordArgs } from './changePassword.type'
import { axiosBaseQuery } from './common/axiosBaseQuery'
import { EndpointBuilderType, IResponse } from './common/types'

const changePasswordEndpoints = (builder: EndpointBuilderType) => {
  return {
    changePassword: builder.mutation<
      IResponse<ChangePasswordResult>,
      ChangePasswordArgs
    >({
      query: (queryArgs) => ({
        url: `/player_api/password`,
        method: 'PUT',
        data: {
          ...queryArgs,
        },
      }),
      transformResponse: (
        res: IResponse<ChangePasswordResult>
      ): ChangePasswordResult => {
        return res.data ?? ''
      },
    }),
  }
}

const changePasswordApi = createApi({
  reducerPath: 'changePasswordApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    ...changePasswordEndpoints(builder),
  }),
})

export default changePasswordApi
export { changePasswordEndpoints }
export const { useChangePasswordMutation } = changePasswordApi
