import { walletApi } from 'services/walletApi'

const enhancedWalletApi = walletApi.enhanceEndpoints({
  endpoints: {
    transferAllToOne: {
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled

          dispatch(
            walletApi.util.updateQueryData(
              'playerBalance',
              undefined,
              (draft) => {
                const newDraft = {
                  ...draft,
                  data: response.data?.wallet,
                }
                Object.assign(draft, newDraft)
              }
            )
          )
        } catch (error) {
          console.error(error)
        }
      },
    },
  },
})

export const { useTransferAllToOneMutation } = enhancedWalletApi
export default enhancedWalletApi
