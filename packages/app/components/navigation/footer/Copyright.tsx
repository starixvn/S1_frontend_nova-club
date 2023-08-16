import useLocalization from 'app/provider/localization'
import { Text } from 'dripsy'
import React from 'react'

const Copyright = () => {
  const { t } = useLocalization()
  return (
    <Text sx={{ p: '$3', textAlign: 'center' }}>{t('footer.copyright')}</Text>
  )
}

export default Copyright
