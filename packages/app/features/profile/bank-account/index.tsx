import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { usePlayerBankQuery } from 'services/bank'
import { PlayerBankResult } from 'services/bank.type'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  styled,
  Text,
  View,
} from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'
import BankAccCard from './BankAccCard'
import { useModal } from 'react-native-modalfy'

const BankAccountScreen = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()
  const { data, isLoading, isFetching } = usePlayerBankQuery()

  const { makeContextualHref } = useContextualRouting()
  const toAddBankAccount = makeContextualHref('add-bank-account')

  const handleRemove = async (item: PlayerBankResult) => {
    // deleteModalRef.current && deleteModalRef.current.showDialog(item)
    openModal('PlayerBankDeleteModal', { bank: item })
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.bankAccount') }}>
      <StyledView>
        {isLoading || isFetching ? (
          <ActivityIndicator size={'large'} color={'$lightCyan'} />
        ) : data?.length > 0 ? (
          data.map((item: PlayerBankResult) => (
            <BankAccCard
              key={item.PlayerBankDetailsId}
              item={item}
              onPressRemove={handleRemove}
            />
          ))
        ) : (
          <StyledViewNoResult>
            <Image
              source={require('app/assets/images/home/fishing.jpg')}
              style={{ aspectRatio: 1, marginBottom: 12, width: '50%' }}
            />
            <Text sx={{ color: '#72859A' }}>{t('bank.noBankAccount')}</Text>
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
            onPress={() =>
              push(toAddBankAccount, '/profile/bank-account/add-bank-account')
            }
          >
            <Icon name="add" size={25} />
            <Button.Label>{t('bank.addBankAccount')}</Button.Label>
          </Button>
        </View>
      </StyledView>
    </PageWithBackHeader>
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
