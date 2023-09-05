import Icon from 'app/components/Icon'
import { useRotateArrow } from 'app/components/select/Select'
import { AnimatePresence, MotiView } from 'moti'
import { useEffect } from 'react'

type RotatableArrowProps = {
  isActive: boolean
}

const RotatableArrow = ({ isActive }: RotatableArrowProps) => {
  const rotateArrow = useRotateArrow()

  useEffect(() => {
    rotateArrow.transitionTo((state) => {
      if (state === 'to' && isActive) {
        return 'from'
      } else {
        return 'to'
      }
    })
  }, [isActive])

  return (
    <AnimatePresence>
      <MotiView
        state={rotateArrow}
        transition={{ type: 'timing' }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="down" color="white" size={12} />
      </MotiView>
    </AnimatePresence>
  )
}

export default RotatableArrow
