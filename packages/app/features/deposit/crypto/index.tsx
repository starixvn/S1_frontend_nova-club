import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import ImportantNotice from 'app/components/ImportantNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Image, Text, View } from 'dripsy'
import React from 'react'

const NOTES = [
  'note.deposit.crypto1',
  'note.deposit.crypto2',
  'note.deposit.crypto3',
]
const CryptoScreen = () => {
  const { t } = useLocalization()
  return (
    <PageWithBackHeader header={{ title: t('deposit.depositMethod.crypto') }}>
      <View sx={{ flex: 1, bg: '$secondary' }}>
        <Text>{t('deposit.selectChannel')}</Text>
        <GradientBox>
          <View sx={{ flexDirection: 'row' }}>
            <Icon name="lc" size={48} />
            <View>
              <Text>{t('deposit.usdt')}</Text>
              <Text>{t('deposit.cryptoAmount')}</Text>
            </View>
          </View>
        </GradientBox>
        <ImportantNotice keys={NOTES} module="crypto" />
      </View>
    </PageWithBackHeader>
  )
}

export default CryptoScreen
