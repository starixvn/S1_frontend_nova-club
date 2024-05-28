import { styled } from 'dripsy'
import { MotiPressable, MotiPressableProps } from 'moti/interactions'
import React, { ComponentProps, FC, useMemo } from 'react'

const DripsyMotiPressable = styled(MotiPressable)()

type BouncePressableProps = MotiPressableProps &
  ComponentProps<typeof DripsyMotiPressable>

const BouncePressable: FC<BouncePressableProps> = ({ children, ...rest }) => {
  return (
    <DripsyMotiPressable
      onPress={() => {}}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            'worklet'

            return {
              scale: pressed ? 1.05 : 1,
              opacity: hovered || pressed ? 0.5 : 1,
            }
          },
        []
      )}
      {...rest}
    >
      {children}
    </DripsyMotiPressable>
  )
}
export default BouncePressable
