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
  View,
} from 'dripsy'
import { createContext, useContext } from 'react'
import { Platform } from 'react-native'
import BouncePressable from 'app/pressable/BouncePressable'
import { Gradient } from '@dripsy/gradient'
type GradientList = keyof DripsyCustomTheme['linearGradients']
type ColorList = keyof DripsyCustomTheme['colors']

export type FillGradient = {
  type: 'gradient'
  color: GradientList | string[]
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
  rounded?: boolean
  disabled?: boolean
  onPress?: () => void
  loading?: boolean
  textColor?: string | keyof DripsyCustomTheme['colors']
  containerStyle?: SxProp
} & Omit<StyledProps<'buttons'>, 'themeKey'>

type ButtonColorContextType = Pick<
  ButtonProps,
  'fill' | 'loading' | 'rounded' | 'textColor' | 'variant' | 'variants'
> & {
  height: number
}

const ButtonColorContext = createContext<ButtonColorContextType>({
  rounded: false,
  textColor: 'white',
  variant: 'md',
  loading: false,
  height: 0,
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
  rounded,
  disabled,
  onPress,
  loading,
  variant = 'md',
  variants,
  textColor,
  containerStyle,
}: ButtonProps) {
  if (__DEV__ && typeof children == 'string') {
    throw new Error(
      '[button] children cannot be a string, but got: ' + children
    )
  }

  const { theme } = useDripsyTheme()

  const height = theme.buttons[variant].height

  const containerStyles: SxProp = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: stretch ? 'stretch' : 'center',
    borderRadius: rounded ? height * 0.5 : 10,
    bg: fill.type === 'surface' ? fill.color : 'transparent',
    borderWidth: fill.type === 'border' ? 1 : 0,
    borderColor: fill.type === 'border' ? fill.color : undefined,
    opacity: disabled || loading ? 0.3 : 1,
    ...containerStyle,
  }

  const containerProps = {
    variant,
    variants,
  }

  const gradientProps = {
    gradient: fill.color.length !== 2 && fill.color,
    colors: fill.color.length === 2 ? fill.color : undefined,
    start: fill.start,
    end: fill.end,
  }

  const Container =
    fill.type === 'gradient' ? StyledGradientContainer : StyledViewContainer

  return (
    <ButtonColorContext.Provider
      value={{ fill, loading, textColor, variant, variants, height }}
    >
      <BouncePressable
        sx={{
          alignItems: 'center',
        }}
        disabled={disabled || loading}
        onPress={onPress}
      >
        <Container
          sx={{
            ...containerStyles,
          }}
          {...containerProps}
          {...(fill.type === 'gradient' ? gradientProps : {})}
        >
          {children}
        </Container>
        {loading && (
          <View
            sx={{
              position: 'absolute',
              top: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
            pointerEvents="none"
          >
            <ActivityIndicator color={'$lightCyan'} />
          </View>
        )}
      </BouncePressable>
    </ButtonColorContext.Provider>
  )
}

function ButtonLabel({
  children,
  textTransform,
  sx,
}: {
  children: string
  textTransform?: 'capitalize'
  sx?: SxProp
}) {
  const { textColor, loading, variant, variants, height } =
    useContext(ButtonColorContext)
  const { theme } = useDripsyTheme()

  return (
    <Text
      variant={variant}
      variants={variants}
      sx={{
        px: '$1',
        lineHeight: height,
        fontWeight: 'bold',
        textTransform,
        color: textColor,
        opacity: loading ? 0 : 1,
        ...sx,
      }}
      selectable={false}
    >
      {children}
    </Text>
  )
}

Button.Label = ButtonLabel

export { Button }
