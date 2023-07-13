import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'

const HorizontalTransactionRowListHeader = () => {
  const { t } = useLocalization()
  return (
    <>
      <View sx={{ flex: 1, flexDirection: 'row', m: 10 }}>
        <View sx={{ flex: 0.3 }}>
          <HeaderText>{'No'}</HeaderText>
        </View>

        <View sx={{ flex: 0.9 }}>
          <HeaderText sx={{ textAlign: 'left' }}>
            {t('deposit.type')}
          </HeaderText>
        </View>

        <View sx={{ flex: 1, flexDirection: 'row' }}>
          <HeaderText>{t('deposit.id')}</HeaderText>
        </View>

        <View sx={{ flex: 0.7, flexDirection: 'column' }}>
          <HeaderText>{t('deposit.date')}</HeaderText>
        </View>

        <View sx={{ flex: 0.5 }}>
          <HeaderText sx={{ textAlign: 'center' }}>
            {t('common.amount')}
          </HeaderText>
        </View>

        <View sx={{ flex: 0.6 }}>
          <HeaderText sx={{ textAlign: 'center' }}>
            {t('deposit.status')}
          </HeaderText>
        </View>
      </View>
    </>
  )
}

const HeaderText = styled(Text)({
  fontWeight: 'bold',
  textTransform: 'capitalize',
})
export default HorizontalTransactionRowListHeader
