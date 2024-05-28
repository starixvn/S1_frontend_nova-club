import { TIMEZONE } from 'app/constants/timezone'
import { store } from 'app/provider/redux/store'
import dayjs, { ConfigType, Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

function dayjsTz(date: ConfigType = dayjs(), timezone?: string): Dayjs {
  // const { data } = playerApi.endpoints.playerProfile.select()(store.getState())
  const currency = store.getState().setting.currency
  // TODO: Should get from `playerProfile` currency
  const currentPlayerCurrency = currency

  const selectedTimezone = timezone || TIMEZONE[currentPlayerCurrency]

  return dayjs(date).tz(selectedTimezone)
}

export default dayjsTz
