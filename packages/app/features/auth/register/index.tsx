import { DripsyGradient } from 'app/components/Gradient'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, styled, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { MotiLink } from 'solito/moti'
import AuthLayout from '../layout/AuthLayout'
import RegisterForm from './RegisterForm'

const HEADER_IMAGE = require('../../../assets/images/register/referral-avatar.png')

const StyledImage = styled(Image)({
  height: 120,
  width: 120,
})

const RegisterPage = () => {
  return (
    <AuthLayout
      formHeader={
        <>
          <DripsyGradient
            gradient={'lightOceanBlue'}
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              py: '$3',
            }}
          >
            <StyledImage
              source={HEADER_IMAGE}
              accessibilityLabel="n88 app logo"
              sx={{
                width: 70,
                height: 70,
              }}
            />

            <View sx={{ ml: '$6' }}>
              <Text sx={{ color: '$oceanBlue', fontSize: 18 }}>
                Referrer information
              </Text>

              <Text sx={{ fontSize: 18, mt: '$2' }}>PLAYER88888</Text>
            </View>
          </DripsyGradient>
          <View sx={{ height: 1.5, backgroundColor: '$cyan' }}></View>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage
