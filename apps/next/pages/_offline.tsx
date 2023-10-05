import React from 'react'
import AvertaStd from 'app/assets/fonts/Averta'
import Logo from '../public/android/android-launchericon-144-144.png'
import Image from 'next/image'

const _offline = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E2238',
      }}
    >
      <Image src={Logo} alt="logo" width={120} height={120} />

      <div
        style={{
          marginTop: 24,
          fontSize: 24,
          fontFamily: AvertaStd.Regular.name,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        You're offline
      </div>
    </div>
  )
}

export default _offline
