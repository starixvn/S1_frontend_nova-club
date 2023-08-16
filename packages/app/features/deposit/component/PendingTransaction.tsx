import RefreshButton from 'app/components/RefreshButton'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ReportDepositStatus, ReportTransactionType } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import { useEffect } from 'react'
import { usePlayerReportQuery } from 'services/playerApi'
import HorizontalTransactionRowListHeader from './HorizontalTransactionRowListHeader'
import RecentTransactionRow from './RecentTransactionRow'

type PendingTransactionProps = {
  paymentMethod: DepositPaymentMethodCategoryId
}

const PendingTransaction = ({ paymentMethod }: PendingTransactionProps) => {
  const { t } = useLocalization()
  const horizontalMode = useIsDesktop()
  const lang = useAppSelector((s) => s.setting.locale)

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
      bank_category_id: paymentMethod,
    },
    { refetchOnMountOrArgChange: true }
  )

  useEffect(() => {
    refetch()
  }, [lang])

  return (
    <View
      sx={{
        width: '100%',
        alignSelf: 'center',
        pb: '$pagePadding',
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
        <Text>{t('transaction.pending')}</Text>
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
  )
}

export default PendingTransaction
