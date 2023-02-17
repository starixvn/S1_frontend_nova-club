import Image from 'app/components/common/Image'
import Icon from 'app/components/Icon'
import { styled } from 'dripsy'
import React from 'react'
import { PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native'

import { RadioButtonProps } from './types'

export default function RadioButton({
  borderColor,
  color = '#444',
  containerStyle,
  description,
  descriptionStyle,
  disabled = false,
  icon,
  iconColor,
  id,
  label,
  labelStyle,
  layout = 'row',
  onPress,
  selected = false,
  size = 24,
  borderSize = 2,
}: RadioButtonProps) {
  const borderWidth = PixelRatio.roundToNearestPixel(borderSize)
  const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5)
  const sizeFull = PixelRatio.roundToNearestPixel(size)

  let orientation: any = { flexDirection: 'row' }
  let margin: any = { marginLeft: 10 }

  if (layout === 'column') {
    orientation = { alignItems: 'center' }
    margin = { marginTop: 10 }
  }

  function handlePress() {
    if (disabled) {
      return null
    }
    if (onPress) {
      onPress(id)
    }
  }

  return (
    <>
      <Pressable
        onPress={handlePress}
        style={[
          styles.container,
          orientation,
          { opacity: disabled ? 0.2 : 1 },
          containerStyle,
        ]}
      >
        <View
          style={[
            styles.border,
            {
              borderColor: borderColor || color,
              borderWidth,
              width: sizeFull,
              height: sizeFull,
              borderRadius: sizeHalf,
              backgroundColor: 'white',
            },
          ]}
        >
          {selected && (
            <View
              style={{
                backgroundColor: color,
                width: sizeHalf,
                height: sizeHalf,
                borderRadius: sizeHalf,
              }}
            />
          )}
        </View>
        <IconWrap
          sx={{ bg: selected ? iconColor : 'transparent', p: 12, ...margin }}
        >
          <Image
            source={{ uri: icon }}
            resizeMode="contain"
            sx={{ width: ICON_SIZE * 0.7, height: ICON_SIZE * 0.7 }}
          />
        </IconWrap>
        {Boolean(label) && <Text style={[margin, labelStyle]}>{label}</Text>}
      </Pressable>
      {Boolean(description) && (
        <Text style={[margin, descriptionStyle]}>{description}</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  border: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const ICON_SIZE = 32
const IconWrap = styled(View)({
  height: ICON_SIZE,
  width: ICON_SIZE,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  m: '$1',
})
