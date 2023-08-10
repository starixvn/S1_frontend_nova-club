import { TIMEZONE } from 'app/constants/timezone'
import dayjs, { ConfigType, Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Currency } from '../constant'
import { Platform } from 'react-native'

dayjs.extend(utc)
dayjs.extend(timezone)

function dayjsTz(date: ConfigType = dayjs(), timezone?: string): Dayjs {
  // const { data } = playerApi.endpoints.playerProfile.select()(store.getState())
  // TODO: Should get from `playerProfile` currency
  const currentPlayerCurrency = Currency.VND

  const selectedTimezone = timezone || TIMEZONE[currentPlayerCurrency]
  console.log(Platform.OS === 'android' ? 'android' : 'ios')

  console.log(
    'tztz----',
    dayjs(date),
    dayjs(date).format('YYYY-MM-DD hh:mm a'),
    selectedTimezone,
    dayjs(date).tz(selectedTimezone).format('YYYY-MM-DD hh:mm a')
  )
  return dayjs(date).tz(selectedTimezone)
}

export default dayjsTz
