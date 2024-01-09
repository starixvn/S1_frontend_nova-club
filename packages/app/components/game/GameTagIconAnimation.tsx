import { SxProp, useSx } from 'dripsy'
import { MotiView } from 'moti'
import { ReactNode, memo, useMemo } from 'react'

const GameTagIconAnimation = ({
  children,
  sx,
}: {
  children: ReactNode
  sx: SxProp
}) => {
  const _sx = useSx()

  const MemoizedIconAnimation = useMemo(
    () => (
      <MotiView
        style={_sx({
          position: 'absolute',
          right: 0,
          paddingHorizontal: 4,
          paddingVertical: 2,
          borderRadius: 5,
          top: -5,
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        })}
        from={{
          scale: 1,
        }}
        animate={{
          scale: 1.25,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 500,
        }}
      >
        {children}
      </MotiView>
    ),
    []
  )

  return MemoizedIconAnimation
}

export default GameTagIconAnimation
