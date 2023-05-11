import { Text, View, styled, useDripsyTheme } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import { MotiView } from 'moti/build'
import React, { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'
import Icon, { IconComponentProps } from './icon'

const ICON_SIZE = 60
const ICON_ACTIVE_SIZE = ICON_SIZE * 1.1

interface GradientButtonProps {
  buttonSize?: number
  toggleState?: boolean
  touchableFeedback?: boolean
  iconProps: IconComponentProps
  label?: string
  textProps?: Omit<ComponentProps<typeof IconLabel>, keyof IconLabelProps>
  routePath?: string
  active?: boolean
  enableToggle?: boolean
}

interface IconLabelProps {
  toggleState: boolean
  enableToggle: boolean
}

const GradientButton = ({
  toggleState = false,
  iconProps,
  label,
  buttonSize = ICON_SIZE,
  textProps,
  routePath,
  enableToggle = false,
}: GradientButtonProps) => {
  const { theme } = useDripsyTheme()
  const router = useRouter()
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          router.push(routePath ?? '/')
        }}
      >
        <MotiView
          from={{
            height: toggleState && enableToggle ? ICON_ACTIVE_SIZE : buttonSize,
            width: toggleState && enableToggle ? ICON_ACTIVE_SIZE : buttonSize,
            transform: [{ translateY: toggleState ? 0 : 0 }],
          }}
          animate={{
            height: toggleState && enableToggle ? ICON_ACTIVE_SIZE : buttonSize,
            width: toggleState && enableToggle ? ICON_ACTIVE_SIZE : buttonSize,
            transform: [{ translateY: toggleState ? -10 : 0 }],
          }}
          transition={{ type: 'timing' }}
        >
          <Gradient
            colors={theme.linearGradients.button}
            sx={{
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconBorderView>
              <Icon
                color={toggleState && enableToggle ? 'white' : '#0D2035'}
                {...iconProps}
              />
            </IconBorderView>
          </Gradient>

          <IconLabel
            toggleState={toggleState ?? false}
            enableToggle={enableToggle ?? false}
            {...textProps}
          >
            {label}
          </IconLabel>
        </MotiView>
      </TouchableOpacity>
    </>
  )
}

const IconBorderView = styled(View)({
  borderRadius: 100,
  borderColor: '#32325A',
  borderWidth: 3.5,
  width: '95%',
  height: '95%',
  alignItems: 'center',
  justifyContent: 'center',
})

const IconLabel = styled(Text)(
  ({ toggleState, enableToggle }: IconLabelProps) => ({
    textAlign: 'center',
    fontWeight: toggleState && enableToggle ? 'bold' : '100',
    paddingTop: 5,
  })
)

export default GradientButton
