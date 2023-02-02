import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Pressable, View } from 'dripsy'
import { AnimatePresence, MotiView, Text } from 'moti'
import React, { useEffect, useReducer, useState } from 'react'
import { sleep } from 'utils/common'

type SwitchProps = {
  isActive: boolean
  width?: number
  size?: number
  activeThumbColor?: string
  inActiveThumbColor?: string
  activeTrackColor?: string
  inActiveTrackColor?: string
}

/**
 * ### Usage
 * @example
 *
 * ```ts
 *       <Switch
 *         isActive={true}
 *         width={90}
 *         size={16}
 *         activeThumbColor='#047600'
 *         inActiveThumbColor = '#FFCED2'
 *         activeTrackColor = '#65FE00'
 *         inActiveTrackColor = '#CC000F'
 *      />
 *```
 */

const Switch = ({
  isActive = false,
  width = 90,
  size = 16,
  activeThumbColor = '#047600',
  inActiveThumbColor = '#FFCED2',
  activeTrackColor = '#65FE00',
  inActiveTrackColor = '#CC000F',
}: SwitchProps) => {
  const [active, toggle] = useReducer((s) => !s, isActive)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLocalization()
  const WIDTH = width
  const THUMB_SIZE = size
  const TRACK_PADDING = 4
  const trackColor = active ? activeTrackColor : inActiveTrackColor
  const borderColor = active ? activeThumbColor : inActiveThumbColor

  const handleToggle = () => {
    setIsLoading(true)
  }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
        toggle()
      }, 1000)
    }
  }, [isLoading])

  return (
    <View
      sx={{
        width: WIDTH,
        borderRadius: 100,
        p: TRACK_PADDING,
        bg: trackColor,
        borderColor,
        borderWidth: 1,
      }}
    >
      <Pressable onPress={handleToggle} sx={{ justifyContent: 'center' }}>
        <AnimatePresence exitBeforeEnter>
          {isLoading ? (
            <ActivityIndicator size={16} />
          ) : (
            <>
              <MotiView
                from={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transform: active
                    ? [{ translateX: WIDTH - THUMB_SIZE - TRACK_PADDING * 2 }]
                    : [{ translateX: 0 }],
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{ type: 'timing', duration: 200 }}
                style={{
                  height: THUMB_SIZE,
                  width: THUMB_SIZE,
                  borderRadius: 100,
                  backgroundColor: active
                    ? activeThumbColor
                    : inActiveThumbColor,
                }}
              />
              <AnimatePresence exitBeforeEnter>
                {active && (
                  <SwitchLabel
                    label={t('common.active')}
                    color="#043B02"
                    isActive={active}
                  />
                )}
                {!active && (
                  <SwitchLabel
                    label={t('common.suspended')}
                    color="white"
                    isActive={active}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </Pressable>
    </View>
  )
}

export const SwitchLabel = ({ isActive, label, color = 'white' }) => {
  return (
    <Text
      key={label}
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      style={{
        position: 'absolute',
        left: isActive ? 4 : undefined,
        right: !isActive ? 4 : undefined,
        fontSize: 12,
        color,
      }}
    >
      {label}
    </Text>
  )
}

export default Switch
