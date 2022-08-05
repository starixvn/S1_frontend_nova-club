import dayjs, { ConfigType, Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
// Asia/Kuala_Lumpur
dayjs.tz.setDefault('Asia/Ho_Chi_Minh')

function dayjsTz(date?: ConfigType, timezone?: string): Dayjs

function dayjsTz(
  date: ConfigType = dayjs(),
  format: string = '',
  timezone?: string
): Dayjs {
  // const { data } = playerApi.endpoints.playerProfile.select()(store.getState())
  // console.log(data?.data?.currency)
  return dayjs.tz(date, format, timezone)
}

export default dayjsTz
