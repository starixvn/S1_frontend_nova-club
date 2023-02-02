import Text from 'agent/components/Text'
import { Currency } from 'app/utils/constant'
import { Flex } from 'dripsy'
import React from 'react'

const DetailsField = ({ label, value }) => {
  return (
    <Flex sx={{ flexDirection: 'row', p: 12 }}>
      <Text sx={{ flex: 0.4 }}>{label} :</Text>
      <Text
        sx={{
          flex: 0.6,
          color: Object.values(Currency).includes(value)
            ? 'theme.colors.$primary'
            : 'black',
        }}
      >
        {value ? value : 'N/A'}
      </Text>
    </Flex>
  )
}

export default DetailsField
