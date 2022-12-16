import { PageWithBackHeader } from 'app/components/layout/Page'
import { useAppSelector } from 'app/provider/redux/store'
import { ScrollView, View } from 'dripsy'
import React from 'react'
import Image from 'app/components/common/Image'

const WorldCupWinner = () => {
  const lang = useAppSelector((state) => state.setting.locale)

  return (
    <PageWithBackHeader
      contentContainerStyle={{ backgroundColor: 'blue' }}
      bounces={false}
      header={{ title: '' }}
    >
      <Image
        resizeMode="contain"
        source={{
          uri: 'https://images.unsplash.com/photo-1670968982579-a0161d82234c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        }}
        style={{
          maxWidth: '100%',
          aspectRatio: 800 / 1161,
        }}
      />
    </PageWithBackHeader>
  )
}

export default WorldCupWinner
