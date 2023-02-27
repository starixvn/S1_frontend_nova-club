import { Text, View } from 'dripsy'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DripsyGradient } from './Gradient'

interface BorderButtonProps {
  borderColor: string
  backgroundColor: string
  text: string
  textColor: string
  height?: number
  width?: number
  size: number
  innerGradientColor: string[]
  onPress?: () => void
}

const BorderButton = ({
  borderColor,
  backgroundColor,
  text,
  textColor,
  height,
  width,
  size,
  innerGradientColor,
  onPress,
}: BorderButtonProps) => {
  const h = height ? height : size
  const w = width ? width : size

  return (
    <>
      <View
        sx={{
          height: h * 1.1,
          borderRadius: size,
          borderWidth: 1,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          alignSelf: 'center',
          marginX: 5,
        }}
      >
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            sx={{
              height: h,
              borderWidth: 2,
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
                paddingX: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                sx={{
                  color: textColor,
                  fontWeight: 'bold',
                  fontSize: size * 0.45,
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
