import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  useResponsiveValue,
} from 'dripsy'
import DepositForm from '../component/DepositForm'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useLocalization from 'app/provider/localization'
import { usePlayerReportQuery } from 'services/playerApi'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import RefreshButton from 'app/components/RefreshButton'
import HorizontalTransactionRowListHeader from '../component/HorizontalTransactionRowListHeader'
import RecentTransactionRow from '../component/RecentTransactionRow'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import { Platform } from 'react-native'
import PendingTransaction from '../component/PendingTransaction'

const CryptoPayScreen = () => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.crypto') }}
    >
      <ScrollView>
        <DepositForm DepositCategoryId={9} />
        {horizontalMode && (
          <PendingTransaction
            paymentMethod={DepositPaymentMethodCategoryId.CRYPTO}
          />
        )}
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default CryptoPayScreen
