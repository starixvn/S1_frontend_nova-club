import { SxProp, useSx } from 'dripsy'
import { ReactNode, memo } from 'react'

const GameTagIconAnimation = memo(
  ({ children, sx }: { children: ReactNode; sx: SxProp }) => {
    const _sx = useSx()
    return (
      <div
        className="btn-anim enlarge-anim"
        style={_sx({
          position: 'absolute',
          right: 0,
          paddingInline: 4,
          paddingBlock: 2,
          borderRadius: 5,
          top: -8,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          zIndex: 10,
          ...sx,
        })}
      >
        {children}
      </div>
    )
  }
)

export default GameTagIconAnimation
