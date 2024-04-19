import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Pressable, SxProp, Text, View } from 'dripsy'
import { AnimatePresence, MotiView, useAnimationState } from 'moti'
import React, { useEffect } from 'react'
import { PressableProps } from 'react-native'
import { SolitoImage } from 'solito/image'

type EuroTabIconProps = {
  icon: string
  label?: string
  active?: boolean
  size: number
  sx?: SxProp
} & PressableProps

export default function EuroTabIcon({
  size,
  active,
  label,
  icon,
  sx,
  ...rest
}: EuroTabIconProps) {
  const { t } = useLocalization()
  const animState = useAnimationState({
    inactive: {
      scale: 0.8,
    },
    active: {
      scale: 1,
    },
  })

  useEffect(() => {
    animState.transitionTo(active ? 'active' : 'inactive')
  }, [active, animState])

  return (
    <View sx={{ alignItems: 'center', ...sx }}>
      <MotiView state={animState} transition={{ type: 'timing' }}>
        <Pressable {...rest}>
          <AnimatePresence>
            {active ? (
              <SolitoImage
                src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/tab-${icon}-on.png`}
                width={size}
                height={size}
                alt=""
              />
            ) : (
              <SolitoImage
                src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/tab-${icon}-off.png`}
                width={size}
                height={size}
                alt=""
              />
            )}
          </AnimatePresence>
        </Pressable>
      </MotiView>
      {label && (
        <Text
          sx={{
            fontWeight: active ? '900' : 'normal',
            textTransform: 'capitalize',
          }}
        >
          {t(label)}
        </Text>
      )}
    </View>
  )
}
