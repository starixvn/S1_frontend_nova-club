import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import DepositCard from './component/DepositCard'
import useCheckMobile from 'app/hooks/useCheckMobile'
import { useDepositPaymentListQuery } from 'services/deposit'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'solito/router'
import RecentTransactionRow from './component/RecentTransactionRow'
import RefreshButton from 'app/components/RefreshButton'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import { usePlayerReportQuery } from 'services/playerApi'
import {
  DEPOSIT_NOTES,
  ReportDepositStatus,
  ReportTransactionType,
} from 'app/utils/constant'
import dayjsTz from 'app/utils/dayjs'
import MenuNotice from 'app/components/navigation/MenuNotice'
import { useModal } from 'react-native-modalfy'
import PaymentMethod, { DepositMethodId } from 'app/config/deposit'
import useDepositList from './tools/useDepositList'

const Deposit = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()

  const { paymentMethodList, isLoading } = useDepositList()

  const {
    data: transactionData,
    isFetching,
    isLoading: transactionIsLoading,
    refetch,
  } = usePlayerReportQuery(
    {
      limit: 5,
      offset: 0,
      status: ReportDepositStatus.ALL,
      time_from: dayjsTz().subtract(2, 'month').startOf('date').toISOString(),
      time_to: dayjsTz().endOf('date').toISOString(),
      trans_type: ReportTransactionType.DEPOSIT,
    },
    { refetchOnMountOrArgChange: true }
  )

  const handlePress = (id) => {
    switch (id) {
      case DepositMethodId.LOCAL_BANK:
        push(`/deposit/bank-transfer`)
        break
      case DepositMethodId.ONLINE_BANK:
        push(`/deposit/online-banking`)
        break
      case DepositMethodId.MOMO:
        push(`/deposit/momo`)
        break
      case DepositMethodId.QR_CODE:
        push(`/deposit/qr-pay`)
        break
      case DepositMethodId.TOP_UP:
        push(`/deposit/topup-card`)
        break
      case DepositMethodId.CRYPTO:
        push(`/deposit/crypto`)
        break
      default:
        break
    }
  }

  return (
    <PageWithBackHeader
      header={{
        title: t('deposit.depositTitle'),
        actions: (
          <MenuNotice
            onPress={() => openModal('NoticeModal', { notice: DEPOSIT_NOTES })}
          />
        ),
      }}
      disableScrollView
    >
      {isLoading ? (
        <ActivityIndicator sx={{ my: '$6' }} />
      ) : paymentMethodList.length > 0 ? (
        <>
          <Text sx={{ my: '$3', mx: '$4' }}>{t('deposit.choose')}</Text>
          <View
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              px: '$3',
              justifyContent: 'space-between',
            }}
          >
            {paymentMethodList &&
              paymentMethodList.map((item, index) => (
                <DepositCard
                  key={item.id}
                  item={item}
                  sx={{
                    mb:
                      paymentMethodList.length - index <= 1 &&
                      (index + 1) % 2 === 1
                        ? 0
                        : '$1',
                  }}
                  onPress={() => handlePress(item.id)}
                />
              ))}
            {/* <Seperator /> */}
          </View>
        </>
      ) : null}
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: '$pagePadding',
          py: '$2',
          mt: '$4',
        }}
      >
        <Text>{t('transaction.recent')}</Text>
        <RefreshButton loading={isFetching} onPress={refetch} />
      </View>
      <ScrollView>
        {transactionIsLoading ? (
          <ActivityIndicator size="large" />
        ) : transactionData?.data?.row_count_total ?? 0 > 0 ? (
          transactionData?.data?.rows.map((item, index) => (
            <RecentTransactionRow
              key={item.tx_code}
              item={item}
              index={index}
            />
          ))
        ) : (
          <EmptyResult />
        )}
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default Deposit
