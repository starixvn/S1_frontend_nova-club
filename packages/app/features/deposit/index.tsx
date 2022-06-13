import Page, { PageSafeArea } from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Text, View, ActivityIndicator, FlatList, styled } from 'dripsy'
import { useDummyRtk } from 'utils/rtk'
import RecentTransactions from './RecentTransactions'
import DepositMethodCard from './DepositMethodCard'
import { Button } from 'app/components/form/Button'
import ValueCard from './ValueCard'
import { useRouter } from 'solito/router'

const mapTypeToIcon = {}

const sampleData = [
  {
    type: 1,
    name: 'deposit.options.bankTransfer',
    icon: 'sl',
    color: '#ac0102',
  },
  {
    type: 2,
    name: 'deposit.options.onlineBanking',
    icon: 'sl',
    color: '#f56e04',
  },
  {
    type: 3,
    name: 'deposit.options.momo',
    icon: 'sl',
    color: '#AC016C',
  },
  {
    type: 4,
    name: 'deposit.options.qrCode',
    icon: 'sl',
    color: '#44BAF9',
  },
  {
    type: 5,
    name: 'deposit.options.topUp',
    icon: 'sl',
    color: '#95AC00',
  },
  {
    type: 6,
    name: 'deposit.options.crypto',
    icon: 'sl',
    color: '#36A07B',
  },
]

const DepositPage = () => {
  const { data, isLoading, isFetching } = useDummyRtk(sampleData)

  const { t } = useLocalization()
  const { push } = useRouter()

  return (
    <PageSafeArea sx={{}}>
      <Text sx={{ my: '$6', mx: '$4' }}>{t('deposit.choose')}</Text>
      {isLoading && <ActivityIndicator />}

      <View sx={{ position: 'relative', mx: '$4' }}>
        {data && (
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => (
              <DepositMethodCard
                item={item}
                sx={{
                  mr: index % 2 === 0 ? '$8' : 0,
                  mb: data.length - index <= 2 ? 0 : '$4',
                }}
                onPress={() => push('/deposit/topup-card')}
              />
            )}
          />
        )}
        <Seperator />
      </View>
      <RecentTransactions />

      <StyledViewButtonWrapper>
        <Button
          disabled={!isLoading || !isFetching}
          rounded
          stretch
          variant="lg"
          fill={{
            type: 'gradient',
            color: ['#33A0D0', '#0B76A5'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
        >
          <Button.Label>{t('common.next')}</Button.Label>
        </Button>
      </StyledViewButtonWrapper>
    </PageSafeArea>
  )
}

const Seperator = styled(View)({
  width: 1,
  bg: '#33A0D0',
  height: '100%',
  position: 'absolute',
  alignSelf: 'center',
})

const StyledViewButtonWrapper = styled(View)(() => ({
  my: '$10',
  mx: '$8',
}))

export default DepositPage
