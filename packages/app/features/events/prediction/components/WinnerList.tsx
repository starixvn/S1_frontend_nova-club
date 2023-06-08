import { Text, View } from 'dripsy'
import React from 'react'

const WinnerList = ({ label, list }) => {
  return (
    <View sx={{ mx: 24, mb: 24, alignItems: 'center' }}>
      <Text
        sx={{
          fontWeight: 'bold',
          fontSize: 15,
          color: '#F861A0',
          mb: 12,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>

      {list &&
        list.map((item, index) => (
          <View
            key={`${index} ${item.username}`}
            sx={{
              bg: '#42569F',
              borderRadius: 24,
              py: 8,
              px: 24,
              mb: 8,
              width: ['85%', '60%'],
              justifyContent: 'center',
            }}
          >
            <Text sx={{ fontWeight: 'bold' }}>{index + 1}.</Text>
            <Text
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                textAlign: 'center',
              }}
            >
              {item.username}
            </Text>
          </View>
        ))}
    </View>
  )
}

export default WinnerList
