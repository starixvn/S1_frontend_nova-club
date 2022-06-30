import { Text, View } from 'dripsy'
import React from 'react'
import RoundedIcon from '../RoundedIcon'
import { SQUARE_NUMBER_OF_COLUMNS } from './SquareSelectorActionSheet'

type BankItemProps = {
  icon: string
  title?: string
  onPress: () => void
}
const BankItem = ({ icon, title, onPress }: BankItemProps) => {
  return (
    <View sx={{ alignItems: 'center', width: '25%' }}>
      <RoundedIcon
        size="lg"
        icon={icon}
        onPress={onPress}
        containerStyle={{
          m: '$0a',
        }}
      />
      <Text sx={{ color: 'black', textAlign: 'center', flexShrink: 1 }}>
        {title}
      </Text>
    </View>
  )
}

export default BankItem
