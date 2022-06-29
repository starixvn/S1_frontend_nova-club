import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import ImportantNotice from 'app/components/ImportantNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Image, styled, Text, View } from 'dripsy'
import React from 'react'

const ICON_SIZE = 50
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
        <Text sx={{ p: '$2' }}>{t('deposit.selectChannel')}</Text>
        <GradientBox>
          <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconWrap>
              <Icon name="lc" size={ICON_SIZE * 0.6} />
            </IconWrap>
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

const IconWrap = styled(View)({
  height: ICON_SIZE,
  width: ICON_SIZE,
  borderRadius: ICON_SIZE,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  m: '$3',
  bg: '#36A07B',
})
export default CryptoScreen
