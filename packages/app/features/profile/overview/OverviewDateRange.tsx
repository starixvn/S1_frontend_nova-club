import DatePicker from 'app/components/form/DatePicker/DatePicker'
import { Sx, Text, View } from 'dripsy'
import { ComponentProps, Dispatch, SetStateAction } from 'react'
import dayjs from 'dayjs'

type DateType = 'startDate' | 'endDate'
type ViewProps = ComponentProps<typeof View>

interface OverviewDateRange {
  endDate: Date
  startDate: Date
  setStartDate: Dispatch<SetStateAction<Date>>
  setEndDate: Dispatch<SetStateAction<Date>>
  onSearch?: (dateType: DateType, currentDate: Date) => any
}

type OverviewDateRangeProps = OverviewDateRange & ViewProps

const OverviewDateRange = ({
  endDate,
  startDate,
  setEndDate,
  setStartDate,
  onSearch,
  ...viewProps
}: OverviewDateRangeProps) => {
  const { sx: viewSx, ...restViewProps } = viewProps

  const rootViewStyle: Sx = {
    ...{
      flexDirection: 'row',
      mt: '$5',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: '$5',
    },
    ...viewSx,
  }

  const onDateChange = (dateType: DateType, currentDate: Date) => {
    if (dateType === 'startDate') {
      if (dayjs(currentDate).isAfter(endDate)) {
        setEndDate(currentDate)
      }

      setStartDate(currentDate)
    } else if (dateType === 'endDate') {
      if (dayjs(currentDate).isBefore(startDate)) {
        setStartDate(currentDate)
      }

      setEndDate(currentDate)
    }

    onSearch?.(dateType, currentDate)
  }

  return (
    <View sx={rootViewStyle} {...restViewProps}>
      <DatePicker
        value={startDate}
        icon={'date'}
        rightIcon={'chevdown'}
        _icon={{
          color: 'white',
          size: 20,
        }}
        _rightIcon={{ size: 20 }}
        style={{ flex: 1 }}
        onChange={(value) => onDateChange('startDate', value)}
      />

      <Text sx={{ justifyContent: 'center', fontSize: 25, mx: '$5' }}>-</Text>
      <DatePicker
        value={endDate}
        icon={'date'}
        rightIcon={'chevdown'}
        _icon={{ color: 'white', size: 20 }}
        _rightIcon={{ size: 20 }}
        style={{ flex: 1 }}
        onChange={(value) => onDateChange('endDate', value)}
      />
    </View>
  )
}

export default OverviewDateRange
