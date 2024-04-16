import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useCallback } from 'react'
import { IResponse } from 'services/common/types'

export enum FailedMessageModule {
  topUpCard = 'topUpCard',
}

const useDepositFailedMessage = () => {
  const { showAlert } = useAlert()
  const { t } = useLocalization()

  const dispatchDepositFailedMessage = useCallback(
    (error: IResponse, options?: { module: FailedMessageModule }) => {
      let errorMessage = t('deposit.commonError')

      if (error && typeof error === 'object') {
        if (error.code === 24005 && 'message' in error) {
          errorMessage = `${error.message} [${error.code}]`
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
