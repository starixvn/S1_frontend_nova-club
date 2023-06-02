import dayjs from 'dayjs'
import { SxProp, Text, View } from 'dripsy'
import React from 'react'

import dayjsTz from 'app/utils/dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

type DateTimeCellProps = {
  date: string
  sx?: SxProp
  isShowDate?: boolean
  isShowTime?: boolean
}

const DateTimeCell = ({
  date,
  sx,
  isShowDate = true,
  isShowTime = true,
}: DateTimeCellProps) => {
  const dateInstance = date.includes('Z') ? dayjs(date) : dayjs(date)

  return (
    <View sx={sx}>
      {isShowDate && <Text sx={sx}>{dateInstance.format('YYYY-MM-DD')}</Text>}
      {isShowTime && (
        <Text sx={{ ...sx }}>{dateInstance.format('hh:mm a')}</Text>
      )}
    </View>
  )
}

export default DateTimeCell
