import { View } from 'dripsy'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

type Props = {}

export default function Unmatched({}: Props) {
  const navigation = useNavigation()
  const router = useRouter()

  useEffect(() => {
    if (navigation.canGoBack()) router.back()
    else router.push('/')
    // router.
    // setTimeout(() => {
    //   navigation.dispatch((state) => {
    //     const routes = state.routes.filter((r) => r.name !== '[...unmatched]')
    //     routes.push({
    //       name: '(Member)',
    //     })
    //     console.log('state', state)
    //     console.log('roues', routes)

    //     CommonActions.reset({
    //       ...state,
    //       routes,
    //       index: routes.length - 1,
    //     })
    //   })
    // }, 2000)
  }, [])
  return (
    <View sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={'$primary.300'} />
    </View>
  )
}
