import Button from 'app/components/common/Button'
import useLocalization from 'app/provider/localization'
import React from 'react'

const WithdrawalConfirm = ({ disabled, onPress }) => {
  const { t } = useLocalization()

  return (
    <Button disabled={disabled} sx={{ mt: '$4' }} onPress={onPress}>
      {t('common.next')}
    </Button>
  )
}

export default WithdrawalConfirm
