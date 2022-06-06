import { Image, styled, Text, View } from 'dripsy'
import React from 'react'
import { Button } from 'react-native'

const BankAccountScreen = () => {
  return (
    <StyledView>
      <StyledViewNoResult>
        <Image
          source={require('app/assets/images/home/fishing.png')}
          style={{ aspectRatio: 1, marginBottom: 12 }}
        />
        <Text sx={{ color: '#72859A' }}>No Bank Account</Text>
      </StyledViewNoResult>
      <View sx={{ mt: '$20' }} />
      <Button title="Add Bank Account" />
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  p: '$12',
}))

const StyledViewNoResult = styled(View)(() => ({
  textAlign: 'center',
}))

export default BankAccountScreen
