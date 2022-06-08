import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { Image, ScrollView, styled, Text, View } from 'dripsy'
import React, { useState } from 'react'
import { useRouter } from 'solito/router'
import BankAccCard from './BankAccCard'

const bankAccList = [
  {
    bankId: 1,
    bankName: 'Vietcombank',
    bankAccNo: '1234 3344 55555',
    bankAccHolderName: 'Nguyen Thien',
    logo: require('app/assets/images/home/lc.png'),
  },
  {
    bankId: 2,
    bankName: 'Bank Account 1',
    bankAccNo: '1234 1234 1111 2222',
    bankAccHolderName: 'Account Holder 1',
    logo: require('app/assets/images/home/slots.png'),
  },
  {
    bankId: 3,
    bankName: 'Bank Account 2',
    bankAccNo: '1234 1234 3333 4444',
    bankAccHolderName: 'Account Holder 2',
    logo: require('app/assets/images/home/lottery.png'),
  },
]

const BankAccountScreen = () => {
  const { push } = useRouter()
  const [items, setItems] = useState(bankAccList)

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.bankId !== id))
  }

  return (
    <StyledView>
      {items.length > 0 ? (
        items.map((item) => (
          <BankAccCard
            key={item.bankId + item.bankName}
            item={item}
            onPressRemove={handleRemove}
          />
        ))
      ) : (
        <StyledViewNoResult>
          <Image
            source={require('app/assets/images/home/fishing.png')}
            style={{ aspectRatio: 1, marginBottom: 12, width: '50%' }}
          />
          <Text sx={{ color: '#72859A' }}>No Bank Account</Text>
        </StyledViewNoResult>
      )}

      <View sx={{ m: '$20' }}>
        <Button
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          onPress={() => push('/profile/bank-account/add-bank-account')}
        >
          <Icon name="lc" size={25} />
          <Button.Label>Add Bank Account</Button.Label>
        </Button>
      </View>
    </StyledView>
  )
}

const StyledView = styled(ScrollView)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$12',
}))

const StyledViewNoResult = styled(View)(() => ({
  textAlign: 'center',
  p: '$12',
  alignItems: 'center',
}))

export default BankAccountScreen
