import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { useAppSelector } from 'app/provider/redux/store'
import { usePlayerWithdrawalBankQuery } from 'app/services/playerWithdrawalBank'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  styled,
  Text,
  View,
} from 'dripsy'
import React, { useEffect, useState } from 'react'
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
  const user = useAppSelector((state) => state.player.currentLoginUser)
  const { data, isLoading, isFetching, isSuccess } =
    usePlayerWithdrawalBankQuery({
      username: user?.username ?? '',
    })

  const [convertedData, setConvertedData] = useState(bankAccList)

  const handleRemove = (id) => {
    // setConvertedData(convertedData.filter((item) => item.bankId !== id))
    console.log('id', id)
  }

  useEffect(() => {
    data && setConvertedData(Object.keys(data).map((key) => data[key]))
  }, [data])

  return (
    <StyledView>
      {isLoading || isFetching ? (
        <ActivityIndicator size={'large'} />
      ) : convertedData.length > 0 ? (
        convertedData.map((item, index) => (
          <BankAccCard
            key={index + item.bankName}
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
