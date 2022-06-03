import { ComponentProps, ComponentType, useRef } from 'react'
import {
  ActivityIndicator,
  createThemedComponent,
  DripsyCustomTheme,
  DripsyVariant,
  styled,
  StyledProps,
  SxProp,
  Text,
  Theme,
  useDripsyTheme,
} from 'dripsy'
import { createContext, useContext } from 'react'
import { Platform, View } from 'react-native'
import BouncePressable from 'app/pressable/BouncePressable'
import { Gradient } from '@dripsy/gradient'
type GradientList = keyof DripsyCustomTheme['linearGradients']
type ColorList = keyof DripsyCustomTheme['colors']

type FillGradient = {
  type: 'gradient'
  color: GradientList
} & ComponentProps<typeof Gradient>

type FillSurface = {
  type: 'surface'
  color: ColorList | string
}

type FillGhost = {
  type: 'ghost'
  color: 'transparent'
}

type FillBorder = {
  type: 'border'
  color: ColorList | string
}

type ButtonProps = {
  children: React.ReactNode
  fill?: FillGradient | FillSurface | FillGhost | FillBorder
  stretch?: boolean
  roundness?: boolean | number | DripsyVariant<'roundness'>
  disabled?: boolean
  onPress?: () => void
  loading?: boolean
  textColor?: string | keyof DripsyCustomTheme['colors']
  height?: number | keyof Theme['sizes']
} & Omit<StyledProps<'buttons'>, 'themeKey'>

type ButtonColorContextType = Pick<
  ButtonProps,
  'fill' | 'loading' | 'roundness' | 'textColor' | 'height'
>

const ButtonColorContext = createContext<ButtonColorContextType>({
  fill: { type: 'gradient', color: 'orangeRed' },
  loading: false,
  height: '$button',
})

const StyledGradientContainer = styled(Gradient, {
  themeKey: 'buttons',
  defaultVariant: 'default',
})()

const StyledViewContainer = styled(View, {
  themeKey: 'buttons',
  defaultVariant: 'default',
})()

function Button({
  children,
  fill = { type: 'gradient', color: 'orangeRed' },
  stretch,
  roundness,
  disabled,
  onPress,
  loading,
  height = '$button',
  variant = 'default',
  variants,
  textColor,
}: ButtonProps) {
  if (__DEV__ && typeof children == 'string') {
    throw new Error(
      '[button] children cannot be a string, but got: ' + children
    )
  }

  const { theme } = useDripsyTheme()

  const containerStyles = {
    px: '$10',
    py: '$3',
    alignSelf: stretch ? 'stretch' : 'center',
    borderRadius:
      roundness == null
        ? 0
        : typeof roundness === 'number'
        ? roundness
        : typeof roundness === 'string'
        ? theme.roundness[roundness]
        : theme.roundness.md,
    bg: fill.type === 'surface' ? fill.color : 'transparent',
    borderWidth: fill.type === 'border' ? 1 : 0,
    borderColor: fill.type === 'border' ? fill.color : undefined,
  }

  const containerProps = {
    variant,
    variants,
  }

  return (
    <ButtonColorContext.Provider value={{ fill, loading, textColor, height }}>
      <BouncePressable
        sx={{
          alignItems: 'center',
        }}
        disabled={disabled || loading}
        onPress={onPress}
      >
        {fill.type === 'gradient' ? (
          <StyledGradientContainer
            sx={{ ...containerStyles }}
            gradient={fill.color}
            {...containerProps}
            start={fill.start}
            end={fill.end}
          >
            {children}
          </StyledGradientContainer>
        ) : (
          <StyledViewContainer
            sx={{
              ...containerStyles,
            }}
            {...containerProps}
          >
            {children}
          </StyledViewContainer>
        )}
      </BouncePressable>
      {loading && (
        <View
          {...{ justifyContent: 'center', alignItems: 'center' }}
          pointerEvents="none"
        >
          <ActivityIndicator color={textColor} />
        </View>
      )}
    </ButtonColorContext.Provider>
  )
}

function ButtonLabel({
  children,
  textTransform,
}: {
  children: string
  textTransform?: 'capitalize'
}) {
  const { textColor, loading, height } = useContext(ButtonColorContext)
  const { theme } = useDripsyTheme()

  const lineHeightBase =
    typeof height == 'string' ? theme.sizes[height] : height
  return (
    <Text
      variant="md"
      sx={{
        fontWeight: 'bold',
        textTransform,
        color: textColor,
        opacity: loading ? 0 : 1,
      }}
      selectable={false}
    >
      {children}
    </Text>
  )
}

Button.Label = ButtonLabel

export { Button }
