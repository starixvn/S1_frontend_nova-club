import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { View, useResponsiveValue } from 'dripsy'
import { ReportResult } from 'services/playerApi.type'
import TransactionRowList from './TransactionRowList'
import HorizontalTransactionRowList from './HorizontalTransactionRowList'

type RecentTransactionRowProps = {
  item: ReportResult
}

const RecentTransactionRow = ({ item, index }) => {
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

  return (
    <>
      {horizontalMode ? (
        <HorizontalTransactionRowList item={item} index={index} />
      ) : (
        <View sx={{ bg: '$primary.200', py: 2, mb: 20 }}>
          <TransactionRowList item={item} />
        </View>
      )}
    </>
  )
}

export default RecentTransactionRow
