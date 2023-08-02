import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(
  import('app/features/auth/forgotPassword/ForgotPasswordScreen'),
  { ssr: false }
)

const LazyDesktopScreen = dynamic(
  import('desktop-ext/features/auth/login/LoginScreenDesktop'),
  { ssr: false }
)
const ForgotPassword = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

export default ForgotPassword
