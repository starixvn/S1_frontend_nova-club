import useLocalization from 'app/provider/localization'
import { Text, View, useResponsiveValue } from 'dripsy'

type ReferralStatusProps = {
  refFriend: number
  refComm: string
}
const ReferralStatus = ({ refComm, refFriend }: ReferralStatusProps) => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  const ReferralValue = [
    { label: t('referral.referNumber'), value: refFriend },
    {
      label: t('referral.totalCom'),
      value: refComm,
    },
  ]
  return (
    <View
      sx={{
        borderWidth: horizontalMode ? 0 : 1,
        borderColor: '$primary.100',
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
      }}
    >
      <View
        sx={{
          marginVertical: 5,
          p: horizontalMode ? 0 : 5,
          alignItems: horizontalMode ? 'flex-start' : 'center',
        }}
      >
        <Text sx={{ fontWeight: 'bold' }}>{t('referral.referralStatus')}</Text>
      </View>
      <View
        sx={{
          borderWidth: horizontalMode ? 1 : 0,
          borderColor: '$primary.100',
          borderRadius: 10,
        }}
      >
        {ReferralValue &&
          ReferralValue.map((e, i) => {
            return (
              <View
                key={i}
                sx={{
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <View
                  sx={{
                    flex: 0.4,
                    justifyContent: 'center',
                    borderColor: '$primary.100',
                    borderTopWidth: horizontalMode && i === 0 ? 0 : 1,
                    borderRightWidth: 1,
                    p: 5,
                  }}
                >
                  <Text>{e.label}</Text>
                </View>
                <View
                  sx={{
                    flex: 0.6,
                    justifyContent: 'center',
                    borderColor: '$primary.100',
                    borderTopWidth: horizontalMode && i === 0 ? 0 : 1,
                    p: 5,
                  }}
                >
                  <Text>{e.value}</Text>
                </View>
              </View>
            )
          })}
      </View>
    </View>
  )
}

export default ReferralStatus
