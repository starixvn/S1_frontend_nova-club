import CustomerSupportScreen from 'app/features/customerSupport'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopAccountLayout } from 'components/layouts/desktop'

const CustomerSupport: AdaptiveLayoutPage = CustomerSupportScreen

CustomerSupport.DesktopLayout = DesktopAccountLayout

export default CustomerSupport
