import IconButton from 'app/components/form/IconButton'
import GradientBox from 'app/components/GradientBox'
import RoundedIcon from 'app/components/RoundedIcon'
import { PlayerWithdrawalBankResult } from 'app/services/playerWithdrawalBank.type'
import { styled, Text, View } from 'dripsy'
import React from 'react'

type BankAccCardProps = {
  item: PlayerWithdrawalBankResult
  onPressRemove: (number) => void
}

const BankAccCard = ({ item, onPressRemove }: BankAccCardProps) => {
  return (
    <StyledBox>
      <RoundedIcon size="lg" icon={item.logo} />
      <StyledViewV>
        <Text sx={{ color: '$PaleBlue', fontWeight: 'bold' }}>
          {item.bankName}
        </Text>
        <Text>{item.bankAccountNumber}</Text>
        <Text>{item.bankAccountFullName}</Text>
      </StyledViewV>
      <IconButton
        name="cross"
        size={36}
        onPress={() => onPressRemove(item.bankTypeId)}
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
