import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { Text, View } from 'dripsy'
import React from 'react'
import WinnerList from './components/WinnerList'

const Winner = () => {
  return (
    <View>
      <Image
        source={require('app/assets/images/logo.png')}
        resizeMode="contain"
        sx={{
          height: [40, 60],
        }}
      />
      <View sx={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Image
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/prediction/ucl.png`,
          }}
          style={{
            height: 100,
            width: 120,
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/prediction/istanbul.png`,
          }}
          style={{
            height: 100,
            width: 120,
          }}
          resizeMode="contain"
        />
      </View>

      <Text sx={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
        DANH SÁCH NGƯỜI CHIẾN THẮNG
      </Text>

      <WinnerList />
    </View>
  )
}

export default Winner
