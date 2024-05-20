import useDailyCheckinPrompt from 'app/hooks/useDailyCheckinPrompt'
import dayjs from 'dayjs'
import { ReactNode, useEffect } from 'react'
import { usePlayerReportQuery } from 'services/playerApi'
import { ReportDepositItem } from 'services/playerApi.type'
import { ReportCommonStatus, ReportTransactionType } from 'utils/constant'

export default function DepositLayout({ children }: { children: ReactNode }) {
  const { skipCheckPrompting, triggerDailyCheckinPromptWithCondition } =
    useDailyCheckinPrompt()

  const { depositHistory, isLoading: transactionIsLoading } =
    usePlayerReportQuery(
      {
        limit: 10,
        offset: 0,
        status: ReportCommonStatus.APPROVED,
        time_from: dayjs().startOf('date').toISOString(),
        time_to: dayjs().endOf('date').toISOString(),
        trans_type: ReportTransactionType.DEPOSIT,
      },
      {
        refetchOnMountOrArgChange: true,
        selectFromResult: (s) => {
          return {
            depositHistory: s.data?.data?.rows as ReportDepositItem[],
            ...s,
          }
        },
      }
    )

  useEffect(() => {
    if (!transactionIsLoading && !skipCheckPrompting && depositHistory) {
      triggerDailyCheckinPromptWithCondition(depositHistory)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionIsLoading])

  return children
}
