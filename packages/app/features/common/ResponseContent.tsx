import Image from 'app/components/common/Image'
import Icon from 'app/components/Icon'
import { Flex, Text, View } from 'dripsy'
import React from 'react'

const ResponseContent = ({ icon, title, subtitle, content }) => {
  return (
    <View sx={{ px: '10%', py: 24 }}>
      <Flex sx={{ justifyContent: 'center', mb: '$2' }}>
        <Image
          source={icon}
          sx={{ mt: '$1', mr: '$2', width: 24, height: 24 }}
        />
        <Text sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          {title}
        </Text>
      </Flex>
      <Text
        sx={{
          mb: '$6',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 18,
          color: '#33ffff',
        }}
      >
        {subtitle}
      </Text>
      <Text
        sx={{
          textAlign: 'center',
          color: '#ccffff',
          fontSize: 16,
          lineHeight: 26,
        }}
      >
        {content}
      </Text>
    </View>
  )
}

export default ResponseContent
