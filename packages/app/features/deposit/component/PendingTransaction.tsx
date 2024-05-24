import RefreshButton from 'app/components/RefreshButton'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import HistoryHeader from 'app/components/history/HistoryHeader'
import { DepositPaymentMethodCategoryId } from 'app/config/deposit'
import { DepositTableHeader } from 'app/features/account/history/dekstop/DesktopDepositHistoryItem'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import dayjs from 'dayjs'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import { useEffect } from 'react'
import { usePlayerReportQuery } from 'services/playerApi'
import { ReportCommonStatus, ReportTransactionType } from 'utils/constant'
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
      status: ReportCommonStatus.PENDING,
      time_from: dayjs().subtract(2, 'month').startOf('date').toISOString(),
      time_to: dayjs().endOf('date').toISOString(),
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
        <View sx={{ bg: '$primary.200', mb: 20 }}>
          <HistoryHeader data={DepositTableHeader} />
        </View>
      )}
      <ScrollView>
        {transactionIsLoading ? (
          <ActivityIndicator
            size="large"
            sx={{ height: 150 }}
            color="$primary.100"
          />
        ) : transactionData?.data?.row_count_total ?? 0 > 0 ? (
          transactionData?.data?.rows.map((item, index) => (
            <RecentTransactionRow key={index} item={item} index={index} />
          ))
        ) : (
          <EmptyResult />
        )}
      </ScrollView>
    </View>
  )
}

export default PendingTransaction
