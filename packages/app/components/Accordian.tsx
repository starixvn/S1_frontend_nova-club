import { AnimateHeight } from 'app/transitions/animate-height'
import { View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import React, { useReducer } from 'react'
import Icon from './Icon'

const Accordian = ({ isExpandable = false, label, children }) => {
  const [isExtend, toggleIsExtend] = useReducer((state) => {
    return !state
  }, false)

  return (
    <MotiPressable onPress={isExpandable ? toggleIsExtend : undefined}>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: '$4',
          minHeight: 36,
        }}
      >
        <View sx={{ position: 'absolute', left: 0, right: 0 }}>{label}</View>
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
                style={{ minHeight: 100 }}
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

export default Accordian
