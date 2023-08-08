import RefreshButton from 'app/components/RefreshButton'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import WithdrawalHistoryItem from 'app/features/account/history/WithdrawalHistoryItem'
import DesktopWithdrawalHistoryItem from 'app/features/account/history/dekstop/DesktopWithdrawalHistoryItem'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ReportCommonStatus, ReportTransactionType } from 'app/utils/constant'
import dayjs from 'dayjs'
import { ActivityIndicator, Text, View } from 'dripsy'
import React, { useEffect } from 'react'
import { usePlayerReportQuery } from 'services/playerApi'

import { WITHDRAWAL_TYPE } from 'services/playerApi.type'

type WithdrawalTransactionsProps = {
  status?: ReportCommonStatus
  withdrawalType?: WITHDRAWAL_TYPE
}

const WithdrawalTransactions = ({
  status = ReportCommonStatus.ALL,
  withdrawalType = WITHDRAWAL_TYPE.ALL,
}: WithdrawalTransactionsProps) => {
  const { t } = useLocalization()
  const lang = useAppSelector((s) => s.setting.locale)
  const { data, isFetching, isLoading, refetch } = usePlayerReportQuery(
    {
      limit: 5,
      offset: 0,
      status: status,
      time_from: dayjs().subtract(2, 'month').startOf('date').toISOString(),
      time_to: dayjs().endOf('date').toISOString(),
      trans_type: ReportTransactionType.WITHDRAWAL,
      withdrawal_type: withdrawalType,
    },
    { refetchOnMountOrArgChange: true }
  )

  useEffect(() => {
    refetch()
  }, [lang])

  return (
    <View sx={{ mb: 12 }}>
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
        <Text>{t('transaction.recent')}</Text>
        <RefreshButton loading={isFetching} onPress={() => refetch()} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : data?.data?.row_count_total ?? 0 > 0 ? (
        data?.data?.rows.map((item, index) => (
          <DesktopWithdrawalHistoryItem
            key={item.tx_code}
            item={item}
            index={index}
          />
        ))
      ) : (
        <EmptyResult />
      )}
    </View>
  )
}
export default WithdrawalTransactions
