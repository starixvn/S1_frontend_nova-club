import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'

const HorizontalTransactionRowListHeader = () => {
  const { t } = useLocalization()
  return (
    <>
      <View sx={{ flex: 1, flexDirection: 'row', m: 10 }}>
        <View sx={{ flexBasis: 40 }}>
          <HeaderText>{'No'}</HeaderText>
        </View>

        <View sx={{ flex: 0.25 }}>
          <HeaderText sx={{ textAlign: 'left' }}>
            {t('deposit.type')}
          </HeaderText>
        </View>

        <View sx={{ flex: 0.25, flexDirection: 'row' }}>
          <HeaderText>{t('deposit.id')}</HeaderText>
        </View>

        <View sx={{ flex: 0.15, flexDirection: 'column' }}>
          <HeaderText>{t('deposit.date')}</HeaderText>
        </View>

        <View sx={{ flex: 0.15 }}>
          <HeaderText sx={{ textAlign: 'center' }}>
            {t('common.amount')}
          </HeaderText>
        </View>

        <View sx={{ flex: 0.2 }}>
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
