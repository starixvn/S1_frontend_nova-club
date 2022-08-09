import { TIMEZONE } from 'app/constant/timezone'
import dayjs, { ConfigType, Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Currency } from '../constant'

dayjs.extend(utc)
dayjs.extend(timezone)

function dayjsTz(date: ConfigType = dayjs(), timezone?: string): Dayjs {
  // const { data } = playerApi.endpoints.playerProfile.select()(store.getState())
  // TODO: Should get from `playerProfile` currency
  const currentPlayerCurrency = Currency.VND

  const selectedTimezone = timezone || TIMEZONE[currentPlayerCurrency]

  return dayjs(date).tz(selectedTimezone)
}

export default dayjsTz
