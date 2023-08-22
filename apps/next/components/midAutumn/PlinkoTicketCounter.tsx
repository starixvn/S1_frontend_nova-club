import { View, Image, Text, ActivityIndicator } from 'dripsy'
import React from 'react'
import { MotiView } from 'moti'
import { ImageBackground } from 'react-native'

interface PlinkoTicketCounterProps {
  enlargedHeight: number
  enlargedWidth: number
  scale: number
  balance: number
  loading: boolean
  loadingBalance: boolean
}

const PlinkoTicketCounter = ({
  enlargedHeight,
  enlargedWidth,
  scale,
  balance,
  loading,
  loadingBalance,
}: PlinkoTicketCounterProps) => {
  return (
    <ImageBackground
      source={require('app/assets/images/events/autumn/cloud-3.png')}
      resizeMode="contain"
      style={{
        position: 'absolute',
        minWidth: enlargedWidth * 0.3,
        minHeight: enlargedHeight * 0.08,
        top: enlargedHeight * 0.28,
        right: enlargedHeight * 0.03,
        // justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row',
        paddingLeft: '5%',
        paddingTop: '5%',
      }}
    >
      <MotiView
        transition={{ type: 'timing', duration: 500 }}
        from={{ scale: 1 }}
        animate={{
          ...(loading && {
            scale: 1.5,
          }),
        }}
        style={{
          width: enlargedWidth * 0.065,
          height: enlargedWidth * 0.05,
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Image
          source={require('app/assets/images/events/autumn/heart.png')}
          resizeMode="contain"
          sx={{ width: '80%', height: '80%', aspectRatio: 1 }}
        />
      </MotiView>
      {loading || loadingBalance ? (
        <ActivityIndicator
          color="white"
          size={enlargedHeight * 0.03}
          sx={{ ml: '$1', height: enlargedHeight * 0.035 }}
        />
      ) : (
        <Text
          sx={{
            color: 'black',
            fontSize: 40 * scale,
            fontWeight: 'bold',
            // minWidth: '50%',
            textAlign: 'center',
            zIndex: 2,
          }}
          selectable={false}
        >
          {balance}
        </Text>
      )}
    </ImageBackground>
  )
}

export default PlinkoTicketCounter
