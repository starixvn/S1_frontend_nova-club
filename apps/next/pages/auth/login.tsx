import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  import('app/features/auth/login/LoginScreen'),
  { ssr: false }
)

const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/auth/login/LoginScreen'),
  { ssr: false }
)
const Login = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

export default Login
