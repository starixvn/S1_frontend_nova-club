import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  import('app/features/auth/register/RegisterScreen'),
  { ssr: false }
)

const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/auth/register/RegisterScreen'),
  { ssr: false }
)
const Register = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

export default Register
