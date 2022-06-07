import IconButton from 'app/components/form/IconButton'
import GradientBox from 'app/components/GradientBox'
import GradientIcon from 'app/components/GradientIcon'
import IconAction from 'app/components/IconAction'
import RoundedIcon from 'app/components/RoundedIcon'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

type BankAccItem = {
  bankId: number
  bankName: string
  bankAccNo: string
  bankAccHolderName: string
  logo: ImageSourcePropType
}

type BankAccCardProps = {
  item: BankAccItem
}

const BankAccCard = ({ item }: BankAccCardProps) => {
  return (
    <StyledBox>
      <RoundedIcon size="small" image={item.logo} />
      <StyledViewV>
        <Text sx={{ color: '$PaleBlue', fontWeight: 'bold' }}>
          {item.bankName}
        </Text>
        <Text>{item.bankAccNo}</Text>
        <Text>{item.bankAccHolderName}</Text>
      </StyledViewV>
      <IconButton
        name="cross"
        size={36}
        onPress={() => console.log('Click on ', item.bankName)}
        sx={{ margin: 'auto' }}
      />
    </StyledBox>
  )
}

const StyledBox = styled(GradientBox)(() => ({
  flexDirection: 'row',
  mt: '$4',
  padding: '$12',
}))

const StyledViewV = styled(View)(() => ({
  px: '$12',
  flex: 1,
  justifyContent: 'space-evenly',
}))
export default BankAccCard
