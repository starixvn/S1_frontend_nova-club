import { PageWithBackHeader } from 'app/components/layout/Page'
import { useAppSelector } from 'app/provider/redux/store'
import { ScrollView, Text, View } from 'dripsy'
import React from 'react'
import Image from 'app/components/common/Image'
import Winners from './Winners'

const WorldCupWinner = () => {
  const lang = useAppSelector((state) => state.setting.locale)

  return (
    <PageWithBackHeader
      contentContainerStyle={{
        backgroundColor: '#5D1132',
        alignItems: 'center',
        paddingVertical: 20,
      }}
      bounces={false}
      header={{ title: 'DANH SÁCH TRÚNG GIẢI' }}
      sx={{ flex: 1, backgroundColor: '#5D1132' }}
    >
      <Image
        source={require('../../../assets/images/logo.png')}
        resizeMode="contain"
        style={{
          width: '100%',
          height: 50,
          marginBottom: 10,
        }}
      />
      <Image
        source={require('../../../assets/images/events/wc/wc-logo.png')}
        resizeMode="contain"
        style={{ width: '100%', height: 60, marginBottom: 20 }}
      />
      <Text sx={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        TRỞ THÀNH THÁNH DỰ ĐOÁN
      </Text>
      {Winners.map((w) => (
        <WinnerGroup name={w.name} list={w.winners} key={w.name} />
      ))}
    </PageWithBackHeader>
  )
}

const WinnerGroup = ({ name, list }) => {
  return (
    <View
      sx={{
        width: '80%',
        maxWidth: 500,
        alignItems: 'center',
        marginBottom: '$2',
      }}
    >
      <Text
        sx={{
          color: '#F7D046',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: '$2',
        }}
      >
        {name}
      </Text>
      {list.map((l, index) => {
        return (
          <View
            key={l}
            sx={{
              bg: '#30011E',
              borderRadius: 20,
              alignSelf: 'stretch',
              py: '$2',
              mb: '$2',
              position: 'relative',
            }}
          >
            {list.length > 1 && (
              <Text
                sx={{
                  width: '15%',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  py: '$2',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                {index + 1 + '.'}
              </Text>
            )}
            <Text
              sx={{
                flex: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              {l}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

export default WorldCupWinner
