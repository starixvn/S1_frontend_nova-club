import RefreshButton from 'app/components/RefreshButton'
import EmptyResult from 'app/components/dataTable/EmptyResult'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import MenuNotice from 'app/components/navigation/MenuNotice'
import { DepositMethodId } from 'app/config/deposit'
import useDailyCheckinPrompt from 'app/hooks/useDailyCheckinPrompt'
import { logEvent } from 'app/integrations/analytic'
import { GAEvents } from 'app/integrations/analytic/events'
import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { ActivityIndicator, ScrollView, Text, View } from 'dripsy'
import { useEffect } from 'react'
import { useModal } from 'react-native-modalfy'
import { useGetAvailableDepositAmountQuery } from 'services/deposit'
import { usePlayerReportQuery } from 'services/playerApi'
import { ReportDepositItem } from 'services/playerApi.type'
import { useRouter } from 'solito/router'
import {
  DEPOSIT_NOTES,
  ReportCommonStatus,
  ReportTransactionType,
} from 'utils/constant'
import DailyMax from './component/DailyMax'
import DepositCard from './component/DepositCard'
import RecentTransactionRow from './component/RecentTransactionRow'
import useDepositList from './tools/useDepositList'

const EmptyRecord = []

const Deposit = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()

  const { paymentMethodList, isLoading } = useDepositList()
  const { data } = useGetAvailableDepositAmountQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const { skipCheckPrompting, triggerDailyCheckinPromptWithCondition } =
    useDailyCheckinPrompt()

  const {
    depositHistory,
    isUninitialized,
    isFetching,
    isLoading: transactionIsLoading,
    refetch,
  } = usePlayerReportQuery(
    {
      limit: 10,
      offset: 0,
      status: ReportCommonStatus.ALL,
      time_from: dayjs().subtract(2, 'month').startOf('date').toISOString(),
      time_to: dayjs().endOf('date').toISOString(),
      trans_type: ReportTransactionType.DEPOSIT,
    },
    {
      refetchOnMountOrArgChange: true,
      selectFromResult: (s) => {
        return {
          depositHistory: (s.data?.data?.rows ??
            EmptyRecord) as ReportDepositItem[],
          ...s,
        }
      },
    }
  )

  useEffect(() => {
    if (!isUninitialized && !transactionIsLoading && !skipCheckPrompting) {
      triggerDailyCheckinPromptWithCondition(depositHistory)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositHistory, isUninitialized, transactionIsLoading])

  const handlePress = (id) => {
    let to = '/deposit'

    switch (id) {
      case DepositMethodId.INSTANT_TRANFER:
        to = `/deposit/instant-transfer`
        break
      case DepositMethodId.LOCAL_BANK:
        to = `/deposit/bank-transfer`
        break
      case DepositMethodId.ONLINE_BANK:
        to = `/deposit/online-banking`
        break
      case DepositMethodId.MOMO:
        to = `/deposit/momo`
        break
      case DepositMethodId.QR_CODE:
        to = `/deposit/qr-pay`
        break
      case DepositMethodId.TOP_UP:
        to = `/deposit/topup-card`
        break
      case DepositMethodId.CRYPTO:
        to = `/deposit/crypto`
        break
      default:
        break
    }

    logEvent(GAEvents.CTA_DepositCategory, {
      ref: to,
      display_name: to,
    })

    push(to)
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
        <ActivityIndicator sx={{ my: '$6' }} color={'$primary.100'} />
      ) : paymentMethodList.length > 0 ? (
        <>
          <DailyMax
            type="deposit"
            amount={data?.current}
            dailyMax={data?.max}
            sx={{ px: '$4', pt: '$4' }}
          />

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
                  onPress={() => {
                    handlePress(item.id)
                  }}
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
          <ActivityIndicator
            size="large"
            color={'$primary.100'}
            sx={{ height: 250 }}
          />
        ) : depositHistory ? (
          depositHistory.map((item, index) => (
            <RecentTransactionRow
              key={item.secure_id}
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
