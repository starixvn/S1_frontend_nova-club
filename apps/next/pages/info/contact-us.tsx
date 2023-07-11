import CustomerSupportScreen from 'app/features/customerSupport'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopInfoLayout } from 'components/layouts/desktop'

const ContactUs: AdaptiveLayoutPage = CustomerSupportScreen

ContactUs.DesktopLayout = DesktopInfoLayout

export default ContactUs
