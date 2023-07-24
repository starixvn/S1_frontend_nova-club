import React, { ComponentProps } from 'react'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'

interface KeyboardViewProps extends KeyboardAwareScrollViewProps {
  children?: React.ReactNode
}

const KeyboardView = ({ children, ...rest }: KeyboardViewProps) => {
  return (
    <>{children}</>
    // TODO: KeyboardAware problem
    // <KeyboardAwareScrollView extraScrollHeight={60} enableOnAndroid {...rest}>
    //   {children}
    // </KeyboardAwareScrollView>
  )
}

export default KeyboardView
