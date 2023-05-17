import Text from 'agent/components/Text'
import { Currency } from 'app/utils/constant'
import { Flex, useDripsyTheme } from 'dripsy'
import React from 'react'

const DetailsField = ({ label, value }) => {
  const { theme } = useDripsyTheme()

  return (
    <Flex sx={{ flexDirection: 'row', p: 12 }}>
      <Text sx={{ flex: 0.4 }}>{label} :</Text>
      <Text
        sx={{
          flex: 0.6,
          color: Object.values(Currency).includes(value)
            ? theme.colors.$primaryAgent
            : 'black',
        }}
      >
        {value !== '' || null || undefined ? value : 'N/A'}
      </Text>
    </Flex>
  )
}

export default DetailsField
