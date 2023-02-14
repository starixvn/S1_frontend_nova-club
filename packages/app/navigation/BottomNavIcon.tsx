import AnimateCrossFadeIn from 'app/components/AnimateCrossFadeIn'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Flex, useDripsyTheme } from 'dripsy'
import { MotiText, MotiView, useAnimationState } from 'moti'
import React, { FC, useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
interface BottomNavTabProps {
  active?: boolean
  name: string
  iconName: string
  size: number
  onPress: () => void
}

const BottomNavIcon: FC<BottomNavTabProps> = ({
  active = false,
  name,
  iconName,
  size,
  onPress,
}) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()

  const color = active ? theme.colors.$cyan : '#0D2035'
  const borderColor = active
    ? theme.colors.$lightNavyBlue
    : theme.colors.$darkNavyBlue
  const colorGradient = active
    ? [theme.colors.$cyan, theme.colors.$lightNavyBlue]
    : [theme.colors.$cyan, theme.colors.$lightNavyBlue]
  const fontColor = active ? theme.colors.$cyan : 'white'

  // const MotiIcon = motify(<TextInput style={{backgroundColor: 'red', height:100, width: 100}} />)()
  // const MotiIcon = motify(<TabIcon active={active} iconName={iconName} />)()

  const outerAnimationState = useAnimationState({
    from: {
      scale: 0.8,
    },
    to: {
      scale: 0.8,
    },
    active: {
      scale: 1,
    },
  })

  const innerAnimationState = useAnimationState({
    from: {
      opacity: 0.8,
    },
    to: {
      opacity: 0.8,
    },
    active: {
      opacity: 1,
    },
  })

  const textState = useAnimationState({
    from: {
      paddingTop: 0,
      fontSize: 12,
    },
    to: {
      paddingTop: 0,
      fontSize: 12,
    },
    active: {
      paddingTop: 5,
      fontSize: 13,
    },
  })

  useEffect(() => {
    if (active) {
      outerAnimationState.transitionTo('active')
      innerAnimationState.transitionTo('active')
      textState.transitionTo('active')
    } else {
      outerAnimationState.transitionTo('to')
      innerAnimationState.transitionTo('to')
      textState.transitionTo('to')
    }
  }, [active])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'visible',
        }}
      >
        <MotiView
          state={outerAnimationState}
          transition={{ type: 'spring' }}
          style={{
            height: size,
            width: size,
            borderRadius: size * 0.5,
            borderWidth: 2,
            borderColor: borderColor,
            backgroundColor: theme.colors.$darkOcean,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MotiView
            state={innerAnimationState}
            transition={{ type: 'spring' }}
            style={{
              height: size * 0.8,
              width: size * 0.8,
              borderRadius: size * 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <DripsyGradient
              colors={colorGradient}
              sx={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AnimateCrossFadeIn active={active}>
                <TabIcon active={active} iconName={iconName} />
              </AnimateCrossFadeIn>
            </DripsyGradient>
          </MotiView>
        </MotiView>

        <MotiText
          state={textState}
          style={{
            marginTop: 1,
            textTransform: 'capitalize',
            fontWeight: active ? 'bold' : 'normal',
            color: fontColor,
          }}
          numberOfLines={1}
        >
          {t(name)}
        </MotiText>
      </Flex>
    </TouchableWithoutFeedback>
  )
}

type TabIconProps = {
  iconName: string
  active?: boolean
}

const TabIcon: FC<TabIconProps> = ({ iconName, active }) => {
  return (
    <Icon
      name={iconName}
      size={28}
      sx={(theme) => ({
        color: active ? 'white' : theme.colors['$secondary'],
      })}
    />
  )
}
export default BottomNavIcon
