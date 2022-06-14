import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { useAppSelector } from 'app/provider/redux/store'
import {
  useDeleteWithdrawalBankMutation,
  usePlayerWithdrawalBankQuery,
} from 'app/services/bank'
import { PlayerWithdrawalBankResult } from 'app/services/bank.type'
import { AlertActions } from 'app/store/alert'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  styled,
  Text,
  View,
} from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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
  const dispatch = useDispatch()
  const { push } = useRouter()
  const user = useAppSelector((state) => state.player.currentLoginUser)
  const { data, isLoading, isFetching, isSuccess } =
    usePlayerWithdrawalBankQuery({
      username: user?.username ?? '',
    })
  const [postDeleteWithdrawalBank] = useDeleteWithdrawalBankMutation()

  const handleRemove = async (item: PlayerWithdrawalBankResult) => {
    try {
      const { data, success, message } = await postDeleteWithdrawalBank({
        bank_acc_num: item.BankAccountNumber,
        bank_type_id: item.BankTypeId,
        username: user?.username ?? '',
      }).unwrap()
      if (success) {
        dispatch(AlertActions.addSuccess(message))
      } else {
        dispatch(AlertActions.addError(message))
      }
    } catch (e) {
      dispatch(AlertActions.addError('common.systemError'))
    }
  }

  // useEffect(() => {
  //   data && setConvertedData(Object.keys(data).map((key) => data[key]))
  // }, [data])

  return (
    <StyledView>
      {isLoading || isFetching ? (
        <ActivityIndicator size={'large'} />
      ) : data.length > 0 ? (
        data.map((item: PlayerWithdrawalBankResult) => (
          <BankAccCard
            key={item.PlayerBankDetailsId}
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

      <View sx={{ m: '$10' }}>
        <Button
          rounded
          stretch
          variant="lg"
          disabled={data && data.length >= 3}
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
  pt: '$6',
}))

const StyledViewNoResult = styled(View)(() => ({
  textAlign: 'center',
  p: '$6',
  alignItems: 'center',
}))

export default BankAccountScreen
