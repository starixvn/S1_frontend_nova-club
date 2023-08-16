import DepositHistoryItem from 'app/features/account/history/DepositHistoryItem'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ReportResult } from 'services/playerApi.type'
import HorizontalTransactionRowList from './HorizontalTransactionRowList'

type RecentTransactionRowProps = {
  item: ReportResult
}

const RecentTransactionRow = ({ item, index }) => {
  const horizontalMode = useIsDesktop()

  return (
    <>
      {horizontalMode ? (
        <HorizontalTransactionRowList item={item} index={index} />
      ) : (
        <DepositHistoryItem item={item} />
      )}
    </>
  )
}

export default RecentTransactionRow
