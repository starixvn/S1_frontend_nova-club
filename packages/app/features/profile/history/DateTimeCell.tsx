import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React from 'react'

import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const DateTimeCell = ({ date }) => {
  const is12HourFormat = dayjs(date, 'YYYY-MM-DD HH:mm:ss A').isValid()

  const dateInstance = is12HourFormat
    ? dayjs(date, 'YYYY-MM-DD HH:mm:ss A')
    : dayjs(date)

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
