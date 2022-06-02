import { Gradient } from '@dripsy/gradient'
import { Text, View } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import { useMemo } from 'react'
import { Button as ButtonRN } from 'react-native'

const Button = () => {
  return (
    <MotiPressable
      onPress={() => {}}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              opacity: hovered || pressed ? 0.5 : 1,
            }
          },

        []
      )}
    >
      <Gradient gradient={'orangeRed'}>
        <Text>df</Text>
      </Gradient>
    </MotiPressable>
  )
}

export default Button
