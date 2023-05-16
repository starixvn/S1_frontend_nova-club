import Input from 'app/components/form/Input'
import { Pressable, Text, View, styled } from 'dripsy'
import React from 'react'
import * as Yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'

const LoginForm = () => {
  return (
    <View
      sx={{
        width: '90%',
        py: 20,
      }}
    >
      <Input icon="profile-rounded" placeholder="Username" />
      <Input icon="pw" placeholder="Password" secureTextEntry />

      <ButtonContainer sx={{ bg: '$secondary.500' }}>
        <ButtonText>LOGIN</ButtonText>
      </ButtonContainer>
      <ButtonContainer sx={{ bg: '$primary.300' }}>
        <ButtonText>Register</ButtonText>
      </ButtonContainer>
    </View>
  )
}

const ButtonContainer = styled(Pressable)({
  borderRadius: 15,
  mb: 20,
  alignItems: 'center',
})

const ButtonText = styled(Text)({
  width: '100%',
  py: 15,
  px: 25,
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

export default LoginForm
