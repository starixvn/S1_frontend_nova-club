import DateTimePicker, {
  IOSNativeProps,
  Event,
} from '@react-native-community/datetimepicker'
import { useAgentLocalization } from 'app/provider/localization'
import React, { FC, useEffect, useState } from 'react'

interface DatePickerModalIOSProps extends IOSNativeProps {
  value: Date
  maximumDate?: Date
  minimumDate?: Date
  isOpen: boolean
  onChange: (e?: Event, selectedDate?: Date) => void
  onClose: () => void
}

const DatePickerIOS: FC<DatePickerModalIOSProps> = ({
  value = new Date(),
  maximumDate,
  minimumDate,
  isOpen,
  onChange,
  onClose,
  ...rest
}) => {
  const { t } = useAgentLocalization()

  const [localValue, setLocalValue] = useState<{ event?: Event; date: Date }>({
    event: undefined,
    date: value,
  })

  const onDateTimePickerChange = (event: Event, date?: Date) => {
    if (!date) {
      return
    }

    setLocalValue({ event, date })
  }

  useEffect(() => {
    if (value && value !== localValue.date) {
      setLocalValue((localVal) => ({
        ...localVal,
        date: value,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    // <Modal
    //   isVisible={isOpen}
    //   onModalHide={onClose}
    //   onBackdropPress={onClose}
    //   title={t('common.selectDate')}
    //   animationIn={'fadeIn'}
    //   animationOut={'fadeOut'}
    //   actions={[
    //     {
    //       label: t('common.confirm'),
    //       onPress: () => {
    //         onChange(localValue.event, localValue.date)
    //       },
    //     },
    //   ]}
    // >
    <DateTimePicker
      themeVariant="dark"
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      display="inline"
      value={localValue.date}
      onChange={onDateTimePickerChange}
      {...rest}
    />
    // </Modal>
  )
}

export default DatePickerIOS
