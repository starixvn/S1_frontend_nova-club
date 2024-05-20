import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import dayjs from 'dayjs'
import { useModal } from 'react-native-modalfy'
import { ReportDepositItem } from 'services/playerApi.type'
import { Currency, ReportDepositStatus } from 'utils/constant'
import * as isToday from 'dayjs/plugin/isToday'

dayjs.extend(isToday.default)

const DepositThresholdByCurrency = {
  [Currency.VND]: 100000,
}
export default function useDailyCheckinPrompt() {
  const { openModal } = useModal()
  const skipCheckPrompting = useAppSelector((s) => {
    return (
      s.setting.stopShowingDailyCheckin != undefined &&
      s.setting.stopShowingDailyCheckin === s.auth.info?.playerName
    )
  })

  function triggerDailyCheckinPromptWithCondition(
    depositRecords: ReportDepositItem[]
  ) {
    const total = depositRecords.reduce((acc, cur) => {
      const isToday = dayjs(cur.date).isToday()

      return (acc +=
        isToday && cur.status === ReportDepositStatus.SETTLED
          ? Number(cur.amount)
          : 0)
    }, 0)

    const thresholdValue = DepositThresholdByCurrency[Currency.VND]
    if (total < thresholdValue) {
      openModal('InformDailyCheckinModal', {
        amountDisplay: toCurrency(thresholdValue, Currency.VND),
      })
    }
  }

  return {
    skipCheckPrompting,
    triggerDailyCheckinPromptWithCondition,
  }
}
