import { MotiView } from 'moti'
import { NextPage } from 'next'
import Image from 'next/image'
import { ActivityIndicator, View } from 'react-native'
import React from 'react'

const Launcher: NextPage<{}> = (props) => {
  const demo = false
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        boxShadow: `inset 0em 0em 1em ${demo ? 'black' : 'rgb(6 109 154)'}`,
      }}
    >
      <MotiView
        animate={{
          scale: [1, 1.02],
          opacity: [1, 0.9],
        }}
        transition={{
          type: 'timing',
          duration: 1000,
          loop: true,
        }}
      >
        <Image
          src={require('app/assets/images/logo.png')}
          width={201}
          height={72}
        />
      </MotiView>
      <View
        style={{
          height: 100,
          width: 700,
          maxWidth: '80%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color="white" size={35} />
      </View>
    </View>
  )
}

export default Launcher
