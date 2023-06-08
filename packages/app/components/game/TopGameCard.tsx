import { Text, styled } from 'dripsy'
import { View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import { DripsyGradient } from '../Gradient'

export default function TopGameCard({ image, number }) {
  return (
    <View sx={{ position: 'relative' }}>
      <View
        sx={{
          width: [70, 100, 120],
          aspectRatio: 170 / 350,
          borderRadius: 15,
          overflow: 'hidden',
        }}
      >
        <SolitoImage src={image} fill alt={image} resizeMode="cover" />
      </View>
      <PaginationItem>{number}</PaginationItem>
    </View>
  )
}

const PaginationItem = ({ children }) => {
  return (
    <View
      sx={{
        position: 'absolute',
        left: '10%',
        top: '-1.5%',
        bg: '$error',
        zIndex: 1,
        width: '30%',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        aspectRatio: 36 / 48,
        boxShadow: 'md',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DripsyGradient
        colors={['$otp', '$transparentWhite']}
        sx={{
          opacity: 0.5,
          position: 'absolute',
          top: 0,
          zIndex: 2,
          width: '100%',
          height: 10,
        }}
      />
      <Text
        sx={{ fontSize: [16, 18], color: '$secondary.100', fontWeight: 'bold' }}
      >
        {children}
      </Text>
    </View>
  )
}
