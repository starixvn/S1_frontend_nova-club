import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import dayjs from 'dayjs'
import { useModal } from 'react-native-modalfy'
import { ReportDepositItem } from 'services/playerApi.type'
import { Currency, ReportDepositStatus } from 'utils/constant'
import * as isToday from 'dayjs/plugin/isToday'
import { generateStopShowingCacheKey } from 'app/components/modal/InformDailyCheckinModal'

import { usePlayerProfileQuery } from 'services/playerApi'
import { useRef } from 'react'

dayjs.extend(isToday.default)

const DepositThresholdByCurrency = {
  [Currency.VND]: 100000,
}
export default function useDailyCheckinPrompt() {
  const { openModal } = useModal()
  const promptedRef = useRef(false)
  const { data: profile } = usePlayerProfileQuery()
  const skipCheckPrompting = useAppSelector((s) => {
    return (
      promptedRef.current ||
      !profile ||
      profile.disabled_event ||
      (s.setting.stopShowingDailyCheckin != undefined &&
        s.setting.stopShowingDailyCheckin ===
          generateStopShowingCacheKey(s.auth.info?.playerName ?? ''))
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
      promptedRef.current = true
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
