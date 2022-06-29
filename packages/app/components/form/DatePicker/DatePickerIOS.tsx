import DateTimePicker from '@react-native-community/datetimepicker'
import Modal from 'app/components/modal'
import useLocalization from 'app/provider/localization'
import { styled, View } from 'dripsy'
import React, { FC, useState } from 'react'

interface DatePickerModalIOSProps {
  value: Date
  maximumDate?: Date
  minimumDate?: Date
  isOpen: boolean
  onChange: (e: any, selectedDate: Date | undefined) => void
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
  const { t } = useLocalization()

  const [localValue, setLocalValue] = useState<Date>(new Date())
  return (
    <Modal
      isVisible={isOpen}
      onModalHide={onClose}
      onBackdropPress={onClose}
      title={t('common.selectDate')}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      actions={[
        {
          label: t('common.confirm'),
          onPress: () => {
            onChange && onChange(null, localValue)
          },
        },
      ]}
    >
      <DateTimePicker
        themeVariant="dark"
        timeZoneOffsetInMinutes={0}
        is24Hour
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        display="spinner"
        value={localValue}
        onChange={(e, d) => d && setLocalValue(d)}
      />
    </Modal>
  )
}

export default DatePickerIOS
