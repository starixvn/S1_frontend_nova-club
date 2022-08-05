import dayjs from 'dayjs'
import { Text } from 'dripsy'
import React from 'react'

import dayjsTz from 'app/utils/dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const DateTimeCell = ({ date }) => {
  const is12HourFormat = dayjs(date, 'YYYY-MM-DD HH:mm:ss A').isValid()

  const dateInstance = is12HourFormat
    ? dayjsTz(date, 'YYYY-MM-DD HH:mm:ss A')
    : dayjsTz(date)

  return (
    <>
      <Text>{dateInstance.format('YYYY-MM-DD')}</Text>
      <Text sx={{ fontSize: '$1', color: '$dim1' }}>
        {dateInstance.format('hh:mm a')}
      </Text>
    </>
  )
}

export default DateTimeCell
