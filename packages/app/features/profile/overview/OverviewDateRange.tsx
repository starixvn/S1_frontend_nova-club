import DatePicker from 'app/components/form/DatePicker/DatePicker'
import dayjs from 'dayjs'
import { Text, View } from 'dripsy'
import { useState } from 'react'

const OverviewDateRange = ({ onSearch }) => {
  const [endDate, setEndDate] = useState<Date>(dayjs().startOf('date').toDate())
  const [startDate, setStartDate] = useState<Date>(
    dayjs().startOf('date').toDate()
  )

  const onDateChange = (e: String, v: Date) => {
    if (e === 'startDate') {
      setStartDate(v)
      onSearch && onSearch(v, endDate)
    } else {
      setEndDate(v)
      onSearch && onSearch(startDate, v)
    }
  }

  return (
    <View sx={{ flexDirection: 'row', mt: '$5', alignItems: 'center' }}>
      <DatePicker
        value={startDate}
        icon={'sb'}
        rightIcon={'chevdown'}
        _icon={{
          color: 'white',
          size: 20,
        }}
        style={{ flex: 1, marginHorizontal: 10 }}
        onChange={(value) => onDateChange('startDate', value)}
      />
      <Text sx={{ justifyContent: 'center', fontSize: 25 }}>-</Text>
      <DatePicker
        value={endDate}
        icon={'sb'}
        rightIcon={'chevdown'}
        _icon={{ color: 'white', size: 20 }}
        style={{ flex: 1, marginHorizontal: 10 }}
        onChange={(value) => onDateChange('endDate', value)}
      />
    </View>
  )
}

export default OverviewDateRange
