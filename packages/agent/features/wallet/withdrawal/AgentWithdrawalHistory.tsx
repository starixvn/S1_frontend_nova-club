import AgentDataTableCell from 'agent/components/DataTable/AgentDataTableCell'
import AgentDataTableRow from 'agent/components/DataTable/AgentDataTableRow'
import TableListing, { LIMIT } from 'agent/components/DataTable/TableListing'
import useTableListing from 'agent/hooks/useTableListing'
import { useWithdrawalListQuery } from 'agent/services/withdrawalApi'
import { DateTimeField } from 'app/components/dataTable/DataTableCell'

import useContainerDimension from 'app/hooks/useContainerDimension'
import { useAgentLocalization } from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Currency } from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import { View } from 'dripsy'
import React, { useState } from 'react'
import { Platform } from 'react-native'

enum WithdrawalStatus {
  Pending = '0',
  Payment = '2',
  Declined = '4',
  Paid = '5',
}
const date =
  dayjsTz()
    .subtract(3, 'month')
    .startOf('date')
    .format('YYYY-MM-DD HH:mm:ss Z') +
  ' to ' +
  dayjsTz().endOf('date').format('YYYY-MM-DD HH:mm:ss Z')

const AgentWithdrawalHistory = ({ currency }: { currency: Currency }) => {
  const { t } = useAgentLocalization()
  const { height } = useContainerDimension()

  const [offset, setOffset] = useState(0)
  const { withdrawalData, totalData, isFetching } = useWithdrawalListQuery(
    {
      currency,
      length: LIMIT,
      start: offset * LIMIT,
      date_from: date,
    },
    {
      selectFromResult: ({ data, isFetching, isSuccess }) => ({
        isFetching,
        withdrawalData: isSuccess ? data?.result?.data : [],
        totalData: data?.result?.recordsTotal ?? 0,
      }),
    }
  )

  const { onLoadMore } = useTableListing({
    offset,
    setOffset,
    LIMIT,
    totalData,
    isFetching,
  })

  const getStatusString = (status: string) => {
    switch (status) {
      case WithdrawalStatus.Pending:
        return 'wallet.pending'
      case WithdrawalStatus.Payment:
        return 'wallet.payment'
      case WithdrawalStatus.Declined:
        return 'wallet.declined'
      case WithdrawalStatus.Paid:
        return 'wallet.paid'
      default:
        return ''
    }
  }

  const onRenderItem = ({ item, index }) => (
    <AgentDataTableRow key={`${index} ${item.created_at}`}>
      <AgentDataTableCell center sx={{ flex: 0.35 }}>
        <DateTimeField dateTime={item.created_at} />
      </AgentDataTableCell>
      <AgentDataTableCell
        sx={{
          flex: 0.4,
        }}
        center
      >
        {toThousandSeparator(item.amount.toString())}
      </AgentDataTableCell>
      <AgentDataTableCell center sx={{ flex: 0.3 }}>
        {t(getStatusString(item.status))}
      </AgentDataTableCell>
    </AgentDataTableRow>
  )

  return (
    <View sx={{ py: '$5', height: Platform.OS !== 'web' ? 500 : null }}>
      <TableListing
        title={t('wallet.recentTransaction')}
        refreshProps={{ titleProps: { sx: { fontWeight: 'bold' } } }}
        data={withdrawalData}
        renderItem={onRenderItem}
        keyExtractor={(item, index) => `${index} Table ${item.username}`}
        onLoadMore={onLoadMore}
        isFetching={isFetching}
        containerStyle={{ flex: 1 }}
      />
    </View>
  )
}

export default AgentWithdrawalHistory
