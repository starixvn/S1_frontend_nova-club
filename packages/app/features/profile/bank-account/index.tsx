import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import { PageWithBackHeader } from 'app/components/layout/Page'
import useContextualRouting from 'app/hooks/useContextualRouting'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import {
  useDeletePlayerBankAccMutation,
  usePlayerBankQuery,
} from 'app/services/bank'
import { PlayerBankResult } from 'app/services/bank.type'
import { AlertActions } from 'app/store/alert'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  styled,
  Text,
  View,
} from 'dripsy'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import BankAccCard from './BankAccCard'
import PlayerBankDeleteModal, {
  PlayerBankDeleteModalForwardRef,
} from './PlayerBankConfirmationModal'

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
  const { t } = useLocalization()
  const dispatch = useDispatch()
  const { push } = useRouter()
  const user = useAppSelector((state) => state.player.currentLoginUser)
  const { data, isLoading, isFetching, isSuccess } = usePlayerBankQuery({
    username: user?.username ?? '',
  })
  const [postDeleteWithdrawalBank] = useDeletePlayerBankAccMutation()
  const deleteModalRef = useRef<PlayerBankDeleteModalForwardRef>(null)

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.BankAccount
  )
  const toAddBankAccount = makeContextualHref('add-bank-account')

  const handleRemove = async (item: PlayerBankResult) => {
    deleteModalRef.current && deleteModalRef.current.showDialog(item)
  }

  return (
    <PageWithBackHeader header={{ title: t('menu.bankAccount') }}>
      <StyledView>
        {isLoading || isFetching ? (
          <ActivityIndicator size={'large'} />
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
              source={require('app/assets/images/home/fishing.png')}
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
            <Icon name="lc" size={25} />
            <Button.Label>{t('bank.addBankAccount')}</Button.Label>
          </Button>
        </View>

        <PlayerBankDeleteModal ref={deleteModalRef} />
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

export default withContextualNav(
  BankAccountScreen,
  ContextualModuleKey.BankAccount
)
