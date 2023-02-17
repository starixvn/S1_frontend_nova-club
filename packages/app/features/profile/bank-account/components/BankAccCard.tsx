import IconButton from 'app/components/form/IconButton'
import GradientBox from 'app/components/GradientBox'
import RoundedIcon from 'app/components/RoundedIcon'
import { PlayerBankResult } from 'services/bank.type'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import { toCleanCard } from 'app/utils'
import { getBankLogo } from 'app/config/bank'
import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'

type BankAccCardProps = {
  item: PlayerBankResult
  onPressRemove: (item) => void
  isCrypto: boolean
}

const BankAccCard = ({
  item,
  onPressRemove,
  isCrypto = false,
}: BankAccCardProps) => {
  const cleanText = isCrypto
    ? item.BankAccountNumber
    : toCleanCard(item.BankAccountNumber)

  return (
    <StyledBox>
      <RoundedIcon
        size="lg"
        icon={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.BankIcon}`}
        imageStyle={{ alignItems: 'center', justifyContent: 'center' }}
      />
      <StyledViewV>
        <Text sx={{ color: '$PaleBlue', fontWeight: 'bold' }}>
          {item.BankCode}
        </Text>
        <Text>{cleanText}</Text>
        {isCrypto ? null : <Text>{item.BankAccountFullName}</Text>}
      </StyledViewV>
      <View sx={{ alignItems: 'center', mt: 'auto', mb: 'auto' }}>
        <IconButton
          name="bin"
          size={25}
          color={'grey'}
          onPress={() => onPressRemove(item)}
        />
      </View>
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
