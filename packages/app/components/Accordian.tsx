import { AnimateHeight } from 'app/transitions/animate-height'
import { styled, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import React, { ReactNode, useReducer } from 'react'
import { DripsyGradient } from './Gradient'
import Icon from './Icon'

type AccordianProps = {
  isExpandable?: boolean
  extended: boolean
  label?: string
  header?: ReactNode
  children: ReactNode
  onPress?: () => void
}

const Accordian = ({
  isExpandable = false,
  extended = true,
  label,
  header,
  children,
  onPress,
}: AccordianProps) => {
  const [isExtend, toggleIsExtend] = useReducer((state) => {
    return !state
  }, extended)

  const handlePress = () => {
    onPress && !isExtend && onPress()
    toggleIsExtend()
  }

  return (
    <MotiPressable onPress={isExpandable ? handlePress : undefined}>
      <View sx={{ borderBottomWidth: 1, borderColor: '$borderBlue' }}>
        <StyledViewHeader gradient={header ? 'transparent' : 'background'}>
          {header ?? <View>{label}</View>}
          {isExpandable && (
            <MotiView
              animate={{ rotate: isExtend ? '-180deg' : '0deg' }}
              transition={{
                type: 'timing',
                duration: 350,
              }}
            >
              <Icon name="chevdown" size={20} />
            </MotiView>
          )}
        </StyledViewHeader>
      </View>
      {isExpandable ? (
        <AnimateHeight enterFrom="bottom" hide={!isExtend}>
          <AnimatePresence>
            {isExtend && (
              <MotiView
                from={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                // style={{ minHeight: 100 }}
              >
                {children}
              </MotiView>
            )}
          </AnimatePresence>
        </AnimateHeight>
      ) : (
        children
      )}
    </MotiPressable>
  )
}

const StyledViewHeader = styled(DripsyGradient)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: 24,
  p: '$3',
})

export default Accordian
