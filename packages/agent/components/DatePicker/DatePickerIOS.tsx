import DateTimePicker, {
  IOSNativeProps,
  Event,
} from '@react-native-community/datetimepicker'
import { useAgentLocalization } from 'app/provider/localization'
import React, { FC, useEffect, useState } from 'react'
import ModalContent from '../Modal/ModalContent'
import { Modal } from 'react-native'

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
  console.log('🚀 ~ file: DatePickerIOS.tsx:28 ~ isOpen:', isOpen)
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
    <Modal
      style={{ backgroundColor: 'black', position: 'absolute', bottom: 0 }}
      visible={isOpen}
      transparent
      onRequestClose={() => {
        onClose()
      }}
    >
      <ModalContent
        title={t('common.selectDate')}
        closeModal={onClose}
        actions={[
          {
            label: t('common.confirm'),
            onPress: () => {
              onChange(localValue.event, localValue.date)
            },
          },
        ]}
      >
        <DateTimePicker
          // themeVariant="dark"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          display="default"
          value={localValue.date}
          onChange={onDateTimePickerChange}
          {...rest}
        />
      </ModalContent>
    </Modal>
  )
}

export default DatePickerIOS
