import { DripsyGradient } from 'app/components/Gradient'
import Icon, { IconComponentProps } from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { ReportGameStatusOptions } from 'app/utils/constant'
import { Image, Pressable, SxProp, Text } from 'dripsy'
import { ComponentProps, ReactNode } from 'react'

export type SelectButtonProps = {
  onPress: () => any
  variants: 'slot' | 'history'
  isSelecting?: boolean
  label: string
  logo?: string
  containerStyle?: SxProp
  chevelonButtonSize?: number
  disabled?: boolean
  children?: ReactNode
  textProps?: ComponentProps<typeof Text>
  iconProps?: Omit<IconComponentProps, 'name'>
}

const SelectButton = ({
  onPress,
  variants = 'history',
  isSelecting = true,
  label,
  logo,
  containerStyle,
  disabled,
  children,
  chevelonButtonSize = 20,
  textProps,
  iconProps,
  ...rest
}: SelectButtonProps) => {
  const { t } = useLocalization()

  let gradient
  let buttonContentSx

  switch (variants) {
    case 'slot':
      gradient = 'plainLightBlue'
      buttonContentSx = {
        borderRadius: 20,
        minHeight: 40,
      }
      break

    case 'history':
    default:
      gradient = isSelecting
        ? 'oceanBlue'
        : disabled
        ? 'disabledSecondary'
        : 'darkNavyBlue'
      break
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
      minWidth: 72,
    },
    ...buttonContentSx,
  }

  return (
    <Pressable
      onPress={onPress}
      sx={{ position: 'relative', ...containerStyle }}
      disabled={disabled}
    >
      <DripsyGradient
        gradient={gradient}
        sx={mergedGradientSx}
        start={isSelecting ? { x: 0.5, y: 0 } : { x: 0, y: 0.5 }}
        end={isSelecting ? { x: 0.5, y: 1 } : { x: 1, y: 0.5 }}
        {...rest}
      >
        {logo && label !== ReportGameStatusOptions[0].label ? (
          <Image
            source={logo}
            sx={{
              height: '100%',
              width: '80%',
              resizeMode: 'contain',
            }}
          />
        ) : (
          <Text sx={{ flex: 0.6 }} numberOfLines={1} {...textProps}>
            {t(label)}
          </Text>
        )}
        <Icon
          name={'chevdown'}
          size={chevelonButtonSize}
          sx={{ position: 'absolute', right: '$2' }}
          {...iconProps}
        />
      </DripsyGradient>
    </Pressable>
  )
}

export default SelectButton
