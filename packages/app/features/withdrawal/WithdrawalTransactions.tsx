import RefreshIconButton from 'app/components/form/IconButton/RefreshButton'
import HistoryEmpty from 'app/components/history/HistoryEmpty'
import useLocalization from 'app/provider/localization'
import {
  ReportDepositStatus,
  ReportTransactionType,
  ReportWithdrawalStatus,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { ActivityIndicator, Text, View } from 'dripsy'
import React from 'react'
import { usePlayerReportQuery } from 'services/playerApi'
import WithdrawalHistoryItem from '../profile/history/WithdrawalHistoryItem'

const WithdrawalTransactions = () => {
  const { t } = useLocalization()
  const { data, isFetching, isLoading, refetch } = usePlayerReportQuery(
    {
      limit: 5,
      offset: 0,
      status: ReportWithdrawalStatus.ALL,
      time_from: dayjsTz().subtract(2, 'month').startOf('date').toISOString(),
      time_to: dayjsTz().endOf('date').toISOString(),
      trans_type: ReportTransactionType.WITHDRAWAL,
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
          px: '$3',
          py: '$2',
          mt: '$4',
        }}
      >
        <Text>{t('transaction.recent')}</Text>
        <RefreshIconButton loading={isFetching} onPress={() => refetch()} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : data?.data?.row_count_total ?? 0 > 0 ? (
        data?.data?.rows.map((item) => (
          <WithdrawalHistoryItem key={item.secure_id} item={item} />
        ))
      ) : (
        <HistoryEmpty />
      )}
    </View>
  )
}
export default WithdrawalTransactions
