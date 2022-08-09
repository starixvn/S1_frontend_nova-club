import dayjs from 'dayjs'
import { Text } from 'dripsy'
import React from 'react'

import dayjsTz from 'app/utils/dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const DateTimeCell = ({ date }) => {
  const dateInstance = dayjsTz(date)

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
