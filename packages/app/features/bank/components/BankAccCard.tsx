import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import IconButton from 'app/components/IconButton'
import RoundedIcon from 'app/components/RoundedIcon'
import StaticField from 'app/components/StaticField'
import { toCleanCard } from 'app/utils'
import { styled, Text, View } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React from 'react'
import { PlayerBankResult } from 'services/bank.type'

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
        containerStyle={{ alignItems: 'center', bg: 'white', p: 4 }}
      />
      <StyledViewV>
        <Text sx={{ fontWeight: 'bold' }}>{item.BankCode}</Text>
        <Text>{cleanText}</Text>
        {isCrypto ? null : <Text>{item.BankAccountFullName}</Text>}
      </StyledViewV>
      <View sx={{ alignItems: 'center', mt: 'auto', mb: 'auto' }}>
        <IconButton name="bin" size={25} onPress={() => onPressRemove(item)} />
      </View>
    </StyledBox>
  )
}

const StyledBox = styled(StaticField)(() => ({
  flexDirection: 'row',
  mt: 8,
  px: '$pagePadding',
  py: 12,
}))

const StyledViewV = styled(View)(() => ({
  px: 12,
  flex: 1,
  justifyContent: 'space-evenly',
}))
export default BankAccCard
