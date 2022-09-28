import { Gradient } from '@dripsy/gradient'
import { styled, SxProp, Text } from 'dripsy'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

export interface SimpleGridImageButtonProps extends TouchableOpacityProps {
  sx?: SxProp
  textStyle?: SxProp
  label: string
  colors: string[]
}

const SimpleGridImageButton = ({
  sx,
  colors,
  label,
  textStyle,
  ...rest
}: SimpleGridImageButtonProps) => {
  return (
    <Root
      sx={{
        ...sx,
      }}
      {...rest}
    >
      <Gradient colors={colors} sx={{ py: 1, px: 6, justifyContent: 'center' }}>
        <Text
          sx={{
            fontWeight: 'bold',
            fontSize: 12,
            textAlign: 'center',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 2,
            ...textStyle,
          }}
        >
          {label.toUpperCase()}
        </Text>
      </Gradient>
    </Root>
  )
}

const Root = styled(TouchableOpacity)({
  borderRadius: 4,
  overflow: 'hidden',
  borderWidth: 1,
})

export default SimpleGridImageButton
