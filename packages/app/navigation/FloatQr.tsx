import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import { View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'

const FloatQr = () => {
  const { openModal } = useModal()

  const handlePressReferral = () => {
    openModal('ReferralModal')
  }
  return (
    <View
      sx={{
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        overflow: 'hidden',
      }}
    >
      <BouncePressable onPress={handlePressReferral}>
        <DripsyGradient
          sx={{
            p: '$3',
            pl: '$4',
            pr: '$5',
          }}
          gradient={'orangeDark'}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Icon name="bar-code" />
        </DripsyGradient>
      </BouncePressable>
    </View>
  )
}

export default FloatQr
