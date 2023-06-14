import { Sx, Text, View } from 'dripsy'
import { ComponentProps, Dispatch, SetStateAction } from 'react'
import dayjs from 'dayjs'
import DatePicker from 'app/components/form/DatePicker'

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
      mt: '$4',
      // alignItems: 'center',
      justifyContent: 'space-between',
      px: '$2',
      // bg: 'green',
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
        inputSx={{ width: '45%' }}
        onChange={(value) => onDateChange('startDate', value)}
      />

      <Text
        sx={{
          fontSize: 25,
          lineHeight: 50,
          height: 50,
        }}
      >
        -
      </Text>
      <DatePicker
        inputSx={{ width: '45%' }}
        value={endDate}
        onChange={(value) => onDateChange('endDate', value)}
      />
    </View>
  )
}

export default OverviewDateRange
