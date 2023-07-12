import { View, Image, Text, ActivityIndicator } from 'dripsy'
import React from 'react'
import { MotiView } from 'moti'

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
    <View
      sx={{
        position: 'absolute',
        minWidth: enlargedWidth * 0.25,
        minHeight: enlargedHeight * 0.06,
        borderRadius: 30,
        backgroundColor: 'rgb(192,224,255)',
        borderWidth: 6 * scale,
        borderColor: '#ffffff',
        borderStyle: 'solid',
        top: enlargedHeight * 0.32,
        right: enlargedHeight * 0.06,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <MotiView
        transition={{ type: 'timing', duration: 500 }}
        from={{ rotateZ: '0deg' }}
        animate={{
          ...(loading && {
            rotateZ: '360deg',
          }),
        }}
        style={{
          width: enlargedWidth * 0.075,
          height: enlargedWidth * 0.075,
          aspectRatio: 1,
        }}
      >
        <Image
          source={require('../../../../packages/app/assets/images/events/plinko/coin.png')}
          sx={{ width: '100%', height: '100%', aspectRatio: 1 }}
        />
      </MotiView>
      {loading || loadingBalance ? (
        <ActivityIndicator
          color="white"
          sx={{
            minWidth: '50%',
          }}
        />
      ) : (
        <Text
          sx={{
            color: '#FF9300',
            fontSize: 40 * scale,
            fontWeight: 'bold',
            minWidth: '50%',
          }}
          selectable={false}
        >
          {balance}
        </Text>
      )}
    </View>
  )
}

export default PlinkoTicketCounter
