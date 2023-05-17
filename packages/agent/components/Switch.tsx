import { useAgentLocalization } from 'app/provider/localization'
import { ActivityIndicator, Pressable, View } from 'dripsy'
import { AnimatePresence, MotiView, Text } from 'moti'
import React, { useEffect, useReducer, useState } from 'react'

type SwitchProps = {
  isActive: boolean
  isLoading: boolean
  width?: number
  size?: number
  activeThumbColor?: string
  inActiveThumbColor?: string
  activeTrackColor?: string
  inActiveTrackColor?: string
  onPress: () => void
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
  isLoading = false,
  width = 84,
  size = 16,
  activeThumbColor = '#047600',
  inActiveThumbColor = '#FFCED2',
  activeTrackColor = '#65FE00',
  inActiveTrackColor = '#CC000F',
  onPress,
}: SwitchProps) => {
  const { t } = useAgentLocalization()
  const WIDTH = width
  const THUMB_SIZE = size
  const TRACK_PADDING = 4
  const trackColor = isActive ? activeTrackColor : inActiveTrackColor
  const borderColor = isActive ? activeThumbColor : inActiveThumbColor

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
      <Pressable
        onPress={onPress}
        sx={{ justifyContent: 'center' }}
        disabled={isLoading}
      >
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
                  transform: isActive
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
                  backgroundColor: isActive
                    ? activeThumbColor
                    : inActiveThumbColor,
                }}
              />
              <AnimatePresence exitBeforeEnter>
                {isActive && (
                  <SwitchLabel
                    label={t('common.active')}
                    color="#043B02"
                    isActive={isActive}
                  />
                )}
                {!isActive && (
                  <SwitchLabel
                    label={t('common.inactive')}
                    color="white"
                    isActive={isActive}
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
      numberOfLines={1}
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
        textAlign: 'right',
        left: isActive ? 4 : 18,
        right: !isActive ? 4 : undefined,
        fontSize: 10,
        color,
      }}
    >
      {label}
    </Text>
  )
}

export default Switch
