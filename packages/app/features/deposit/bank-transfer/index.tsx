import RefreshButton from 'app/components/RefreshButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import { Platform } from 'react-native'
import BankTransferForm from './BankTransferForm'
import { usePlayerReportQuery } from 'services/playerApi'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { DepositMethodId } from 'app/constants/deposit'
import RecentTransactionRow from '../component/RecentTransactionRow'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'

const BankTransferScreen = () => {
  const { t } = useLocalization()

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
        <View
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: '$pagePadding',
            py: '$2',
            mt: '$4',
          }}
        >
          <Text>{t('transaction.Pending')}</Text>
          <RefreshButton loading={isFetching} onPress={refetch} />
        </View>
        <ScrollView>
          {transactionIsLoading ? (
            <ActivityIndicator size="large" />
          ) : transactionData?.data?.row_count_total ?? 0 > 0 ? (
            transactionData?.data?.rows.map((item) => (
              <RecentTransactionRow key={item.tx_code} item={item} />
            ))
          ) : (
            <EmptyResult />
          )}
        </ScrollView>
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default BankTransferScreen
