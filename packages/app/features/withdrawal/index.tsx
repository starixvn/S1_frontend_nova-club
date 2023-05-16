import MenuNotice from 'app/components/common/MenuNotice'
import { PageWithBackHeader } from 'app/components/layout/Page'
import {
  DepositMethodId,
  DepositPaymentMethodCategoryId,
} from 'app/config/deposit'
import { WITHDRAWAL_NOTES } from 'app/constant/notes'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import DepositMethodCard from '../deposit/DepositMethodCard'
import AvailableBalance from './AvailableBalance'
import WithdrawalTransactions from './WithdrawalTransactions'

const WITHDRAWAL_OPTIONS = [
  {
    id: DepositMethodId.LOCAL_BANK,
    categoryId: DepositPaymentMethodCategoryId.LOCAL_BANK,
    name: 'deposit.depositMethod.bankTransfer',
    icon: 'lba',
    color: '#ac0102',
    active: true,
  },
  // {
  //   id: DepositMethodId.CRYPTO,
  //   categoryId: DepositPaymentMethodCategoryId.CRYPTO,
  //   name: 'deposit.depositMethod.crypto',
  //   icon: 'cp',
  //   color: '#36A07B',
  //   active: true,
  // },
]

const WithdrawalPage = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()
  const { openModal } = useModal()

  const handlePress = (id) => {
    switch (id) {
      case DepositMethodId.LOCAL_BANK:
        push(`/withdrawal/bank`)
        break
      case DepositMethodId.CRYPTO:
        push(`/withdrawal/crypto`)
        break
      default:
        break
    }
  }

  return (
    <PageWithBackHeader
      header={{
        title: t('menu.withdraw'),
        actions: (
          <MenuNotice
            onPress={() =>
              openModal('NoticeModal', { notice: WITHDRAWAL_NOTES })
            }
          />
        ),
      }}
    >
      <StyledView>
        <AvailableBalance />

        <>
          <Text sx={{ my: '$6', mx: '$4' }}>{t('withdrawal.options')}</Text>
          <View
            sx={{
              position: 'relative',
              mx: '$4',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {WITHDRAWAL_OPTIONS &&
              WITHDRAWAL_OPTIONS.map((item, index) => (
                <DepositMethodCard
                  key={item.id}
                  item={item}
                  onPress={() => handlePress(item.id)}
                />
              ))}
          </View>
        </>

        <WithdrawalTransactions />
      </StyledView>
    </PageWithBackHeader>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
}))

export default WithdrawalPage
