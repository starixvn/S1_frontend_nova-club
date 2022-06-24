import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import React from 'react'

const DateTimeCell = ({ date }) => {
  return (
    <>
      <Text>{dayjs(date).format('YYYY-MM-DD')}</Text>
      <Text sx={{ fontSize: '$1', color: '$dim1' }}>
        {dayjs(date).format('HH:MM')}
      </Text>
    </>
  )
}

export default DateTimeCell
