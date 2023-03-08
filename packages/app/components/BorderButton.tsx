import { Text, View, SxProp } from 'dripsy'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DripsyGradient } from './Gradient'

type BorderButtonProps = {
  text: string
  textColor: string
  height?: number
  width?: number
  size: number
  innerGradientColor: string[]
  onPress?: () => void
} & ComponentProps<typeof View>

const BorderButton = ({
  text,
  textColor,
  height,
  width,
  size,
  innerGradientColor,
  onPress,
  ...rest
}: BorderButtonProps) => {
  const h = height ? height : size
  const w = width ? width : size
  const scale = Platform.OS === 'web' ? 1.5 : 1

  const { sx, ...restProp } = rest

  const defaultSxStyle: SxProp = {
    height: h * 1.1 * scale,
    borderRadius: size,
    borderWidth: 1 * scale,
    alignSelf: 'center',
    marginX: 5,
  }
  const viewSx = {
    ...defaultSxStyle,
    ...sx,
  }

  return (
    <>
      <View sx={viewSx} {...restProp}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            sx={{
              height: h * scale,
              borderWidth: 2 * scale,
              borderRadius: size,
              alignSelf: 'center',
              overflow: 'hidden',
            }}
          >
            <DripsyGradient
              colors={innerGradientColor}
              sx={{
                height: '100%',
                width: '100%',
                paddingX: Platform.OS === 'web' ? 10 : 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                sx={{
                  color: textColor,
                  fontWeight: 'bold',
                  fontSize: size * 0.45 * scale,
                }}
              >
                {text}
              </Text>
            </DripsyGradient>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

export default BorderButton
