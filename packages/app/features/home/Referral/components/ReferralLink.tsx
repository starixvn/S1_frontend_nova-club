import IconButton from 'app/components/IconButton'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { Text, View, useResponsiveValue } from 'dripsy'

type ReferralLinkProps = {
  referralLink: string
}

const ReferralLink = ({ referralLink }) => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])
  return (
    <View
      sx={{
        borderWidth: horizontalMode ? 0 : 1,
        borderColor: '$primary.100',
        borderRadius: 10,
        p: horizontalMode ? 0 : 10,
      }}
    >
      <View sx={{ marginVertical: 5 }}>
        <Text sx={{ fontWeight: 'bold' }}>{t('referral.link')}</Text>
      </View>
      <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton
          name={'copy'}
          color={'white'}
          size={12}
          sx={{ p: 5 }}
          onPress={() => copyToClipboard(referralLink)}
        />
        <Text>{referralLink}</Text>
      </View>
    </View>
  )
}

export default ReferralLink
