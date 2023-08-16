import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import IconButton from 'app/components/IconButton'
import RoundedIcon from 'app/components/RoundedIcon'
import StaticField from 'app/components/StaticField'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { toCleanCard } from 'app/utils'
import { Text, View, styled } from 'dripsy'
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
  const desktop = useIsDesktop()
  const cleanText = isCrypto
    ? item.BankAccountNumber
    : toCleanCard(item.BankAccountNumber)

  return (
    <StyledBox
      sx={{
        ...(desktop && {
          borderWidth: 2,
          borderTopWidth: 2,
          borderBottomWidth: 2,
        }),
      }}
    >
      <RoundedIcon
        size="lg"
        icon={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.BankIcon}`}
        imageStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        containerStyle={{
          alignItems: 'center',
          bg: 'white',
          p: 4,
          width: 140,
        }}
      />
      <StyledView>
        <Text sx={{ fontWeight: 'bold' }}>{item.BankCode}</Text>
        <Text>{cleanText}</Text>
        {isCrypto ? null : <Text>{item.BankAccountFullName}</Text>}
      </StyledView>
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

const StyledView = styled(View)(() => ({
  px: 12,
  flex: 1,
  justifyContent: 'space-evenly',
}))
export default BankAccCard
