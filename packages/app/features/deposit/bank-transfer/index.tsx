import RefreshButton from 'app/components/RefreshButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  useResponsiveValue,
} from 'dripsy'
import { Platform } from 'react-native'
import BankTransferForm from './BankTransferForm'
import { usePlayerReportQuery } from 'services/playerApi'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { DepositMethodId } from 'app/constants/deposit'
import RecentTransactionRow from '../component/RecentTransactionRow'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import HorizontalTransactionRowList from '../component/HorizontalTransactionRowList'
import HorizontalTransactionRowListHeader from '../component/HorizontalTransactionRowListHeader'
import PendingTransaction from '../component/PendingTransaction'

const BankTransferScreen = () => {
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
      bank_category_id: DepositPaymentMethodCategoryId.LOCAL_BANK,
    },
    { refetchOnMountOrArgChange: true }
  )

  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.bankTransfer') }}
    >
      <ScrollView>
        <BankTransferForm />
        {horizontalMode && (
          <PendingTransaction
            paymentMethod={DepositPaymentMethodCategoryId.LOCAL_BANK}
          />
        )}
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default BankTransferScreen
