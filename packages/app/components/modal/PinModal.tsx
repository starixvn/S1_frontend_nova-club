import UnderlinePinField from 'app/features/pin/UnderlinePinField'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { MotiLink } from 'solito/moti'
import { useRouter } from 'solito/router'
import IconButton from '../form/IconButton'

const MODAL_PADDING = 24

const PinModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const [value, setValue] = useState('')
  const onConfirm = getParam('onConfirm')

  const { makeContextualHref } = useContextualRouting()
  const toForgotPin = makeContextualHref('forgot-pin')

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
      }}
    >
      <View sx={{ px: MODAL_PADDING, justifyContent: 'center' }}>
        <IconButton
          name="cross"
          size={24}
          onPress={() => closeModal()}
          sx={{ position: 'absolute', right: MODAL_PADDING }}
        />
        <Text sx={{ fontSize: 22 }}>{t('pin.submitTitle')}</Text>
      </View>
      <UnderlinePinField title="" value={value} setValue={setValue} />

      <View sx={{ px: MODAL_PADDING }}>
        <View sx={{ alignItems: 'flex-end', my: '$4' }}>
          <MotiLink
            href={toForgotPin}
            as={`/pin/forgot-pin`}
            animate={({ hovered, pressed }) => {
              'worklet'
              return {
                scale: pressed ? 0.9 : hovered ? 1.1 : 1,
              }
            }}
            onPress={() => closeModal()}
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
          </MotiLink>
        </View>
        <Text>{t('pin.submitNote')}</Text>
      </View>
    </View>
  )
}

export default PinModal
