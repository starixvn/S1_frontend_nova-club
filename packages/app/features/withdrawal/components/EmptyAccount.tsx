import Button from 'app/components/common/Button'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'

const EmptyAccount = ({ label, onClose, onCloseActionSheet }) => {
  const handleClose = () => {
    onClose()
    onCloseActionSheet()
  }

  return (
    <View
      sx={{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onPress={() => handleClose()}>{label}</Button>
    </View>
  )
}

export default EmptyAccount
