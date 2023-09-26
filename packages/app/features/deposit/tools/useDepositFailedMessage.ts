import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useCallback } from 'react'

export enum FailedMessageModule {
  topUpCard = 'topUpCard',
}

const useDepositFailedMessage = () => {
  const { showAlert } = useAlert()
  const { t } = useLocalization()

  const dispatchDepositFailedMessage = useCallback(
    (error: unknown, options?: { module: FailedMessageModule }) => {
      let errorMessage = t('deposit.commonError')

      if (error && typeof error === 'object') {
        if (
          options?.module === FailedMessageModule.topUpCard &&
          'message' in error
        ) {
          errorMessage = `${error.message}`
        } else if ('code' in error) {
          errorMessage += ` [${error.code}]`
        }
      }

      /** `setTimeout` is used due to multiple modal close and open at the same time
       * causing the modal content to be blank
       */
      setTimeout(() => {
        showAlert(errorMessage)
      })
    },
    [showAlert, t]
  )

  return {
    dispatchDepositFailedMessage,
  }
}

export default useDepositFailedMessage
