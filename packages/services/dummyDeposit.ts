import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { EndpointBuilderType, IResponse } from './common/types'
import {
  DepositPaymentCategoriesArgs,
  DepositPaymentCategoriesResult,
} from './dummyDeposit.type'

const dummyDepositEndPoints = (builder: EndpointBuilderType) => {
  return {
    /**
     * *xoon88 deposit bank
     */
    depositPaymentCategories: builder.query<
      IResponse<DepositPaymentCategoriesResult>,
      DepositPaymentCategoriesArgs
    >({
      query: ({ formData }) => {
        console.log('formData', formData)
        return {
          url: `/player_center/depositPaymentCategories`,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: { formData },
        }
      },
    }),
  }
}

const dummyDepositApi = createApi({
  reducerPath: 'dummyDepositApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://player.xoon88.com/api' }),
  endpoints: (builder) => ({
    ...dummyDepositEndPoints(builder),
  }),
})

export default dummyDepositApi
export { dummyDepositEndPoints }
export const {
  useDepositPaymentCategoriesQuery,
  useLazyDepositPaymentCategoriesQuery,
} = dummyDepositApi
