import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'

const ReferralCommission = () => {
  const { t } = useLocalization()
  return (
    <View sx={{ padding: 10, alignItems: 'center' }}>
      <Text
        sx={{
          textTransform: 'uppercase',
          textAlign: 'center',
          color: '$secondary.100',
          fontWeight: 'bold',
        }}
      >
        {t('referral.referralStatement')}
      </Text>
    </View>
  )
}

export default ReferralCommission
