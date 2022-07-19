import { DripsyGradient, DripsyGradientProps } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Image, Pressable, SxProp, Text } from 'dripsy'
import { ComponentProps } from 'react'

interface ButtonProps {
  onOpen: () => any
  title: string
  icon?: string
  isActive?: boolean
  buttonContentProps?: DripsyGradientProps
}

type SelectButtonProps = ButtonProps & ComponentProps<typeof Pressable>

const SelectButton = ({
  onOpen,
  title,
  icon,
  isActive = true,
  buttonContentProps,
  ...restButtonProps
}: SelectButtonProps) => {
  const { t } = useLocalization()
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
      p: '$2',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '$lightNavyBlue',
      minHeight: 42,
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
        {icon ? (
          <Image
            source={icon}
            sx={{
              height: '100%',
              width: '80%',
              resizeMode: 'contain',
            }}
          />
        ) : (
          <Text sx={{ flex: 0.8 }} numberOfLines={1}>
            {t(title)}
          </Text>
        )}
        <Icon
          name={'chevdown'}
          size={20}
          // sx={{ flex: 0.2 }}
          sx={{ position: 'absolute', right: '$1' }}
        />
      </DripsyGradient>
    </Pressable>
  )
}

export default SelectButton
