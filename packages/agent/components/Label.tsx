import Text from 'agent/components/Text'
import { View } from 'dripsy'
import React, { useEffect, useRef } from 'react'
import { Platform } from 'react-native'
export interface InputLabelProps {
  htmlFor?: string
  nativeId?: string
  isRequired?: boolean
  children?: string
}

const Label = (props: InputLabelProps) => {
  const { htmlFor, nativeId, isRequired = false, children } = props

  const labelRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    if (labelRef.current) {
      if (htmlFor) {
        labelRef.current.htmlFor = htmlFor
      } else if (nativeId) {
        labelRef.current.htmlFor = nativeId ?? ''
      }
    }
  }, [htmlFor, nativeId])

  return (
    <View
      //@ts-expect-error
      ref={labelRef}
      sx={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        my: '$0a',
      }}
      {...Platform.select({
        web: {
          accessibilityRole: 'label',
        },
      })}
      nativeID={nativeId ? `${nativeId}-label` : undefined}
    >
      <Text
        sx={{
          color: '$textAgent',
          fontWeight: '500',
          lineHeight: 20,
        }}
        numberOfLines={1}
      >
        {children}
      </Text>

      {isRequired && (
        // @ts-expect-error
        <Text
          sx={{
            color: '$errorAgent',
          }}
          {...Platform.select({
            web: {
              accessibilityHidden: true,
              accessibilityRole: 'presentation',
            },
          })}
        >
          *
        </Text>
      )}
    </View>
  )
}

Label.displayName = 'AgentInputLabel'

export default Label
