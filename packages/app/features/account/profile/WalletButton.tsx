import GradientButton from 'app/components/GradientButton'
import { Profile_Wallet_Route } from 'app/components/navigation/RoutePath'
import { View } from 'dripsy'

import { Link } from 'solito/link'

const WalletButton = () => {
  return (
    <View
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        maxWidth: '95%',
        width: 500,
        mb: 20,
      }}
    >
      {Profile_Wallet_Route.map((r, index) => {
        return (
          <Link key={r.label} href={r.path ?? '/'}>
            <GradientButton
              label={r.label}
              iconProps={{
                name: r.icon ?? 'notice',
                size: 30,
                color: 'white',
              }}
              textProps={{
                numberOfLines: 1,
                sx: {
                  fontSize: 13,
                },
              }}
              routePath={r.path}
              enableToggle={true}
            />
          </Link>
        )
      })}
    </View>
  )
}

export default WalletButton
