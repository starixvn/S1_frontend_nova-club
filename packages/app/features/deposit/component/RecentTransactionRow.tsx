import DepositHistoryItem from 'app/features/account/history/DepositHistoryItem'
import DesktopDepositHistoryItem from 'app/features/account/history/dekstop/DesktopDepositHistoryItem'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ReportResult } from 'services/playerApi.type'

type RecentTransactionRowProps = {
  item: ReportResult
}

const RecentTransactionRow = ({ item, index }) => {
  const horizontalMode = useIsDesktop()

  return (
    <>
      {horizontalMode ? (
        <DesktopDepositHistoryItem key={index} item={item} index={index} />
      ) : (
        <DepositHistoryItem item={item} />
      )}
    </>
  )
}

export default RecentTransactionRow
