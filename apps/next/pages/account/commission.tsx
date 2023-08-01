import CommissionTableScreen from 'app/features/commission'
import { AdaptiveLayoutPage } from 'components/layouts/AdaptiveLayout'
import { DesktopAccountLayout } from 'components/layouts/desktop'

const CommissionTable: AdaptiveLayoutPage = CommissionTableScreen

CommissionTable.DesktopLayout = DesktopAccountLayout

export default CommissionTable
