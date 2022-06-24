import IconButton from 'app/components/form/IconButton'
import GradientBox from 'app/components/GradientBox'
import RoundedIcon from 'app/components/RoundedIcon'
import { PlayerBankResult } from 'services/bank.type'
import { styled, Text, View } from 'dripsy'
import React from 'react'

type BankAccCardProps = {
  item: PlayerBankResult
  onPressRemove: (item) => void
}

const BankAccCard = ({ item, onPressRemove }: BankAccCardProps) => {
  return (
    <StyledBox>
      <RoundedIcon
        size="lg"
        icon={{
          uri: `https://player-stage.gball8.com/api/nv88_api/v1/${item.BankIcon}`,
        }}
      />
      <StyledViewV>
        <Text sx={{ color: '$PaleBlue', fontWeight: 'bold' }}>
          {item.BankCode}
        </Text>
        <Text>{item.BankAccountNumber}</Text>
        <Text>{item.BankAccountFullName}</Text>
      </StyledViewV>
      <IconButton
        name="cross"
        size={36}
        onPress={() => onPressRemove(item)}
        sx={{ mt: 'auto', mb: 'auto' }}
      />
    </StyledBox>
  )
}

const StyledBox = styled(GradientBox)(() => ({
  flexDirection: 'row',
  mt: '$2',
  padding: '$6',
}))

const StyledViewV = styled(View)(() => ({
  px: '$6',
  flex: 1,
  justifyContent: 'space-evenly',
}))
export default BankAccCard
