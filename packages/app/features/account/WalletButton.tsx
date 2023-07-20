import IconButtonGradient from 'app/components/IconButtonGradient'
import IconButtonGradientGroup from 'app/components/IconButtonGradientGroup'
import { Profile_Wallet_Route } from 'app/navigation/RoutePath'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'

import { Link } from 'solito/link'
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
          <Link
            key={r.label}
            href={r.path ?? '/'}
            viewProps={{
              style: { flex: 1, alignItems: 'center' },
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
          </Link>
        )
      })}
    </IconButtonGradientGroup>
  )
}

export default WalletButton
