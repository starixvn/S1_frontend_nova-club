import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useLocalization from 'app/provider/localization'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  useResponsiveValue,
} from 'dripsy'
import { usePlayerReportQuery } from 'services/playerApi'
import DepositForm from '../component/DepositForm'
import RefreshButton from 'app/components/RefreshButton'
import HorizontalTransactionRowListHeader from '../component/HorizontalTransactionRowListHeader'
import RecentTransactionRow from '../component/RecentTransactionRow'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import { Platform } from 'react-native'
import PendingTransaction from '../component/PendingTransaction'

const QRPayScreen = () => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  const {
    data: transactionData,
    isFetching,
    isLoading: transactionIsLoading,
    refetch,
  } = usePlayerReportQuery(
    {
      limit: 5,
      offset: 0,
      status: ReportDepositStatus.PENDING,
      time_from: dayjsTz().subtract(2, 'month').startOf('date').toISOString(),
      time_to: dayjsTz().endOf('date').toISOString(),
      trans_type: ReportTransactionType.DEPOSIT,
      bank_category_id: DepositPaymentMethodCategoryId.QR_CODE,
    },
    { refetchOnMountOrArgChange: true }
  )
  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.qrPay') }}
    >
      <ScrollView>
        <DepositForm
          DepositCategoryId={DepositPaymentMethodCategoryId.QR_CODE}
        />
        {horizontalMode && (
          <PendingTransaction
            paymentMethod={DepositPaymentMethodCategoryId.QR_CODE}
          />
        )}
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default QRPayScreen
