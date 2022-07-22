import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const KeyboardView = ({ children, ...rest }) => {
  return (
    <KeyboardAwareScrollView extraScrollHeight={60} enableOnAndroid {...rest}>
      {children}
    </KeyboardAwareScrollView>
  )
}

export default KeyboardView
