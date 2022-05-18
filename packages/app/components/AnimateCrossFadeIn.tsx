import { AnimatePresence, MotiView } from 'moti'
import React, { FC, Props, PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { IconComponentProps } from './Icon'

type CrossFadeProps = {
  active: boolean
  children: React.ReactNode
}

const AnimateCrossFadeIn: FC<CrossFadeProps> = ({ active, children }) => {
  return (
    <AnimatePresence>
      {active && <MotiActiveIcon key="active">{children}</MotiActiveIcon>}
      {!active && (
        <MotiActiveIcon key="Inactive">{children}</MotiActiveIcon>
      )}
    </AnimatePresence>
  )
}

const MotiActiveIcon: FC<React.ReactNode> = ({ children }) => {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    //   transition={{
    //     type: 'timing',
    //     duration: 2000,
    //   }}
      style={styles.icon}
    >
      {children}
    </MotiView>
  )
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AnimateCrossFadeIn
