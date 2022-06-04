import Icon, { IconComponentProps } from 'app/components/Icon'
import { Pressable, styled, SxProp, View } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'

interface IIconButtonProps {
  name: string
  size?: number
  onPress?: () => void
}

const IconButton = ({
  onPress,
  name,
  size = 32,
  ...rest
}: IIconButtonProps) => {
  return (
    <StyledMotiPressable
      onPress={onPress}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              opacity: hovered || pressed ? 0.5 : 1,
              scale: pressed ? 0.8 : 1,
              backgroundColor: hovered || pressed ? 'black' : 'transparent',
            }
          },
        []
      )}
      {...rest}
    >
      <Icon name={name} size={size} />
    </StyledMotiPressable>
  )
}

const StyledMotiPressable = styled(MotiPressable)(() => ({
  borderRadius: 100,
}))

export default IconButton
