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

const DepositTransactions = ({ isLocalBank = false }) => {
  const { t } = useLocalization()
  const depositLocal = {
    limit: 5,
    offset: 0,
    status: ReportDepositStatus.PENDING,
    time_from: dayjsTz().subtract(2, 'month').startOf('date').toISOString(),
    time_to: dayjsTz().endOf('date').toISOString(),
    trans_type: ReportTransactionType.DEPOSIT,
    bank_category_id: DepositPaymentMethodCategoryId.LOCAL_BANK,
  }

  const depositAll = {
    limit: 5,
    offset: 0,
    status: ReportDepositStatus.ALL,
    time_from: dayjsTz().subtract(2, 'month').startOf('date').toISOString(),
    time_to: dayjsTz().endOf('date').toISOString(),
    trans_type: ReportTransactionType.DEPOSIT,
  }

  const { data, isFetching, isLoading, refetch } = usePlayerReportQuery(
    isLocalBank ? depositLocal : depositAll,
    { refetchOnMountOrArgChange: true }
  )

  return (
    <View>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: '$4',
          mx: '$4',
          mb: '$2',
        }}
      >
        <Text sx={{}}>
          {isLocalBank ? t('transaction.pending') : t('transaction.recent')}
        </Text>
        <RefreshIconButton loading={isFetching} onPress={() => refetch()} />
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : data?.data?.row_count_total ?? 0 > 0 ? (
        data?.data?.rows.map((item) => (
          <DepositHistoryItem key={item.secure_id} item={item} />
        ))
      ) : (
        <HistoryEmpty sx={{ mt: '$6' }} />
      )}
    </View>
  )
}
export default DepositTransactions
