import RefreshIconButton from 'app/components/form/IconButton/RefreshButton'
import HistoryEmpty from 'app/components/history/HistoryEmpty'
import DepositHistoryItem from 'app/features/profile/history/DepositHistoryItem'
import useLocalization from 'app/provider/localization'
import {
  DepositPaymentMethodCategoryId,
  ReportDepositStatus,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { ActivityIndicator, Text, View } from 'dripsy'
import React from 'react'
import { usePlayerReportQuery } from 'services/playerApi'

const DepositTransactions = () => {
  const { t } = useLocalization()
  const { data, isFetching, isLoading, refetch } = usePlayerReportQuery(
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
    <View>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: '$4',
        }}
      >
        <Text sx={{}}>{t('transaction.pending')}</Text>
        <RefreshIconButton loading={isFetching} onPress={() => refetch()} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : data?.data?.row_count_total ?? 0 > 0 ? (
        data?.data?.rows.map((item) => (
          <DepositHistoryItem key={item.secure_id} item={item} />
        ))
      ) : (
        <HistoryEmpty />
      )}
    </View>
  )
}
export default DepositTransactions
