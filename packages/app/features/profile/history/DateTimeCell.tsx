import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React from 'react'

import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const DateTimeCell = ({ date }) => {
  return (
    <>
      <Text>{dayjs(date, 'YYYY-MM-DD HH:mm:ss A').format('YYYY-MM-DD')}</Text>
      <Text sx={{ fontSize: '$1', color: '$dim1' }}>
        {dayjs(date, 'YYYY-MM-DD HH:mm:ss A').format('hh:mm a')}
      </Text>
    </>
  )
}

export default DateTimeCell
