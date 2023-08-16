import { View } from 'dripsy'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

type Props = {}

export default function Unmatched({}: Props) {
  const navigation = useNavigation()
  const router = useRouter()

  function handleUnmatched() {
    if (navigation.canGoBack()) router.back()
    else router.replace('/')
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      handleUnmatched()
    })
  }, [])
  return (
    <View
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1E2238',
      }}
    >
      <ActivityIndicator color={'#50509E'} />
    </View>
  )
}
