import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useCallback } from 'react'

const useDepositFailedMessage = () => {
  const { showAlert } = useAlert()
  const { t } = useLocalization()

  const dispatchDepositFailedMessage = useCallback(
    (error: unknown) => {
      let errorMessage = t('deposit.commonError')

      if (error && typeof error === 'object' && 'code' in error) {
        errorMessage += ` [${error.code}]`
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
