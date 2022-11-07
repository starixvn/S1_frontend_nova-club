import RippleAnimation from 'app/components/animated/RippleAnimation'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React from 'react'

const FloatQr = ({ onPress }) => {
  const isSuggestions = useAppSelector((s) => s.setting.suggestions)

  return (
    <>
      {isSuggestions && (
        <>
          <RippleAnimation scale={1.5} delay={0} />
          <RippleAnimation scale={1.5} delay={1000} />
        </>
      )}
      <View
        style={{
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          overflow: 'hidden',
          // display: 'none',
        }}
      >
        <BouncePressable onPress={onPress}>
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
    </>
  )
}

export default FloatQr
