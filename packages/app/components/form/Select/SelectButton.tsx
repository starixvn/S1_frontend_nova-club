import { DripsyGradient, DripsyGradientProps } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { Pressable, SxProp, Text } from 'dripsy'
import { ComponentProps } from 'react'

interface ButtonProps {
  onOpen: () => any
  title: string
  isActive?: boolean
  buttonContentProps?: DripsyGradientProps
}

type SelectButtonProps = ButtonProps & ComponentProps<typeof Pressable>

const SelectButton = ({
  onOpen,
  title,
  isActive = true,
  buttonContentProps,
  ...restButtonProps
}: SelectButtonProps) => {
  const { sx, ...pressableProps } = restButtonProps || {}
  const { sx: buttonContentSx, ...dripsyGradientProp } =
    buttonContentProps || {}

  const mergedButtonSx: SxProp = {
    ...{
      position: 'relative',
    },
    ...sx,
  }

  const mergedGradientSx: SxProp = {
    ...{
      py: '$12',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '$lightNavyBlue',
    },
    ...buttonContentSx,
  }

  return (
    <Pressable onPress={onOpen} sx={mergedButtonSx} {...pressableProps}>
      <DripsyGradient
        gradient={isActive ? 'oceanBlue' : 'darkNavyBlue'}
        sx={mergedGradientSx}
        start={isActive ? { x: 0.5, y: 0 } : { x: 0, y: 0.5 }}
        end={isActive ? { x: 0.5, y: 1 } : { x: 1, y: 0.5 }}
        {...dripsyGradientProp}
      >
        <Text>{title}</Text>

        <Icon
          name={'chevdown'}
          size={25}
          sx={{ position: 'absolute', right: '$12' }}
        />
      </DripsyGradient>
    </Pressable>
  )
}

export default SelectButton
