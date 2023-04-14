import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  styled,
  Text,
  View,
} from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { PlayerBankResult } from 'services/bank.type'
import BankAccCard from './BankAccCard'

const BankCardForm = ({
  bankList,
  isLoading,
  onPress,
  buttonLabel,
  isCrypto,
}) => {
  const { t } = useLocalization()
  const { openModal } = useModal()
  const { width } = useContainerDimension()

  const handleRemove = async (item: PlayerBankResult) => {
    openModal('PlayerBankDeleteModal', { bank: item })
  }

  return (
    <StyledView>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'$lightCyan'} />
      ) : bankList.length > 0 ? (
        bankList.map((item: PlayerBankResult) => (
          <BankAccCard
            key={item.PlayerBankDetailsId}
            item={item}
            onPressRemove={handleRemove}
            isCrypto={isCrypto}
          />
        ))
      ) : (
        <StyledViewNoResult>
          <Image
            source={require('app/assets/images/empty-result.png')}
            style={{
              aspectRatio: 1,
              marginBottom: 12,
              width: width * 0.5,
              height: width * 0.5,
            }}
          />
          <Text sx={{ color: '#72859A' }}>{t('bank.noBankAccount')}</Text>
        </StyledViewNoResult>
      )}

      <View sx={{ m: '$10' }}>
        <Button
          rounded
          stretch
          variant="md"
          disabled={bankList && bankList.length >= 3}
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          sx={{ mb: '$4' }}
          onPress={onPress}
        >
          <Icon name="add" size={25} />
          <Button.Label>{buttonLabel}</Button.Label>
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

export default BankCardForm
