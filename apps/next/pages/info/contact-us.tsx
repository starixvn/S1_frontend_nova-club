import { DesktopCommonInfoLayout } from 'components/layouts/desktop'
import withAdaptiveScreen from 'desktop-ext/hoc/withAdaptiveScreen'
import dynamic from 'next/dynamic'

const LazyMobileScreen = dynamic(() => import('app/features/info/ContactUs'), {
  ssr: false,
})

const LazyDesktopScreen = dynamic(
  () => import('desktop-ext/features/info/contact-us/index'),
  {
    ssr: false,
  }
)

const ContactUs = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

ContactUs.DesktopLayout = DesktopCommonInfoLayout

export default ContactUs
