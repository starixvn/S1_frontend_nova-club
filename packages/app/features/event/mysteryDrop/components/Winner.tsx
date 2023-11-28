import Icon from 'app/components/Icon'
import { Row, Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const Winner = () => {
  return (
    <View
      sx={{
        my: '$5',
        bg: 'rgba(50, 50, 90, 0.5)',
        borderRadius: 16,
        p: '$3',
      }}
    >
      <View sx={{ alignItems: 'center' }}>
        <Icon name="mystery-win" size={60} sx={{ mt: 0 }} />
        <Text sx={{ fontWeight: 'bold' }}>Latest Wins</Text>
      </View>

      {[1, 2, 3, 4, 5].map((item, index) => (
        <Row
          key={item}
          sx={{
            p: '$2',
            borderRadius: 8,
            justifyContent: 'space-between',
            bg: index % 2 === 0 ? '$primary.500' : 'transparent',
          }}
        >
          <Row>
            <Icon name="mystery-win" />
            <Text>xxxx</Text>
          </Row>
          <Text>VND 100,000</Text>
        </Row>
      ))}
    </View>
  )
}

export default Winner
