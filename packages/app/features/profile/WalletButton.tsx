import GradientButton from 'app/components/GradientButton'
import { Profile_Wallet_Route } from 'app/components/navigation/RoutePath'
import { View } from 'dripsy'

import { Link } from 'solito/link'
import { useRouter } from 'solito/router'

const WalletButton = () => {
  const { push } = useRouter()
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
              size={50}
              iconProps={{
                name: r.icon ?? 'notice',
                size: 24,
                color: 'white',
              }}
              labelProps={{
                numberOfLines: 1,
              }}
              onPress={() => {
                push(r.path ?? '/')
              }}
            />
          </Link>
        )
      })}
    </View>
  )
}

export default WalletButton
