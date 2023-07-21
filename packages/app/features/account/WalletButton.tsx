import IconButtonGradient from 'app/components/IconButtonGradient'
import IconButtonGradientGroup from 'app/components/IconButtonGradientGroup'
import { Profile_Wallet_Route } from 'app/navigation/RoutePath'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import { useRouter } from 'solito/router'

const WalletButton = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  return (
    <IconButtonGradientGroup
      sx={{
        maxWidth: '95%',
        width: 500,
        mb: 20,
      }}
    >
      {Profile_Wallet_Route.map((r, index) => {
        return (
          <View
            key={r.label}
            sx={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <IconButtonGradient
              size={60}
              icon={r.icon ?? 'notice'}
              onPress={() => {
                push(r.path ?? '/')
              }}
            />
            <IconButtonGradient.Label sx={{ fontWeight: '500' }}>
              {t(r.label)}
            </IconButtonGradient.Label>
          </View>
        )
      })}
    </IconButtonGradientGroup>
  )
}

export default WalletButton
