import TransferScreen from 'app/features/transfer/TransferScreen'
import { DesktopWalletLayout } from 'components/layouts/desktop'

const Transfer = TransferScreen
// const Transfer = withAdaptiveScreen(LazyMobileScreen, LazyDesktopScreen)

Transfer.DesktopLayout = DesktopWalletLayout

export default Transfer
