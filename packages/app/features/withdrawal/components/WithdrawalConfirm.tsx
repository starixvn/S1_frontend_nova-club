import Button, { ButtonProps } from 'app/components/common/Button'
import useLocalization from 'app/provider/localization'
import React from 'react'

const WithdrawalConfirm = ({ ...rest }: ButtonProps) => {
  const { t } = useLocalization()

  return (
    <Button sx={{ mt: '$4' }} {...rest}>
      {t('common.next')}
    </Button>
  )
}

export default WithdrawalConfirm
