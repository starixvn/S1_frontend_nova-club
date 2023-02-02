import UnderlinePinField from 'app/features/pin/UnderlinePinField'
import { useKeyboard } from 'app/hooks/useKeyboard'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconButton from '../form/IconButton'

const MODAL_PADDING = 24

const PinModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const [value, setValue] = useState('')
  const onConfirm = getParam('onConfirm')
  const onForgotPin = getParam('onForgotPin')

  const keyboardHeight = useKeyboard()

  function onDismiss() {
    closeModal()
  }

  function onPinConfirmed() {
    onConfirm && onConfirm(value)
    onDismiss()
  }

  useEffect(() => {
    value.length === 6 && onPinConfirmed()
  }, [value])

  return (
    <View
      sx={{
        py: MODAL_PADDING,
        bg: '$background',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        mb: keyboardHeight,
      }}
    >
      <View
        sx={{
          px: MODAL_PADDING,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text sx={{ fontSize: 22 }}>{t('pin.submitTitle')}</Text>
        <IconButton name="cross" size={24} onPress={() => closeModal()} />
      </View>
      <UnderlinePinField title="" value={value} setValue={setValue} />

      <View sx={{ px: MODAL_PADDING }}>
        <View sx={{ alignItems: 'flex-end', my: '$4' }}>
          <TouchableOpacity
            onPress={() => {
              closeModal()
              onForgotPin && onForgotPin()
            }}
          >
            <Text
              variant="md"
              sx={{
                fontSize: [14, 16],
                opacity: 0.8,
              }}
            >
              {t('pin.forgotPin') + '?'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text>{t('pin.submitNote')}</Text>
      </View>
    </View>
  )
}

export default PinModal
