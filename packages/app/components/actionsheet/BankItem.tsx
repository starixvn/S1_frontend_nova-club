import { Text, View } from 'dripsy'
import React from 'react'
import RoundedIcon from '../RoundedIcon'
import { SQUARE_NUMBER_OF_COLUMNS } from './SquareSelectorActionSheet'

type BankItemProps = {
  icon: string
  title: string
  onPress: () => void
}
const BankItem = ({ icon, title, onPress }: BankItemProps) => {
  return (
    <View sx={{ flex: 1 / SQUARE_NUMBER_OF_COLUMNS, alignItems: 'center' }}>
      <RoundedIcon
        size="lg"
        icon={icon}
        onPress={onPress}
        containerStyle={{
          m: '$0a',
        }}
      />
      <Text
        sx={{ color: 'black', textAlign: 'center', wordBreak: 'break-word' }}
      >
        {title}
      </Text>
    </View>
  )
}

export default BankItem
