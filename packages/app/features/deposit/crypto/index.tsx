import { ActivityIndicator, ScrollView, Text, View, useResponsiveValue } from 'dripsy'
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

const CryptoPayScreen = () => {
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
    <ScrollView>
      <DepositForm DepositCategoryId={DepositPaymentMethodCategoryId.CRYPTO} />
      <View
        sx={{
          width: horizontalMode ? '90%' : '100%',
          alignSelf: 'center',
        }}
      >
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
        {horizontalMode && (
          <View sx={{ bg: '$primary.200', py: 2, mb: 20 }}>
            <HorizontalTransactionRowListHeader />
          </View>
        )}

        <ScrollView>
          {transactionIsLoading ? (
            <ActivityIndicator size="large" />
          ) : transactionData?.data?.row_count_total ?? 0 > 0 ? (
            transactionData?.data?.rows.map((item, index) => (
              <RecentTransactionRow
                key={item.tx_code}
                item={item}
                index={index + 1}
              />
            ))
          ) : (
            <EmptyResult />
          )}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default CryptoPayScreen
