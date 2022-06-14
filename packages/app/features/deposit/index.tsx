import Page, {
  PageSafeArea,
  PageWithBackHeader,
} from 'app/components/layout/Page'
import useLocalization from 'app/provider/localization'
import { Text, View, ActivityIndicator, FlatList, styled } from 'dripsy'
import { useDummyRtk } from 'utils/rtk'
import RecentTransactions from './RecentTransactions'
import DepositMethodCard from './DepositMethodCard'
import { Button } from 'app/components/form/Button'
import { useRouter } from 'solito/router'
import useContextualRouting from 'app/hooks/useContextualRouting'
import withContextualNav from 'app/navigation/web/withContextualNav'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'

const mapTypeToIcon = {}

const sampleData = [
  {
    type: 1,
    name: 'Bank Transfer',
    icon: 'sl',
    color: '#ac0102',
  },
  {
    type: 2,
    name: 'Online Banking',
    icon: 'sl',
    color: '#f56e04',
  },
]

const Deposit = () => {
  const { data, isLoading, isFetching } = useDummyRtk(sampleData)
  const { push } = useRouter()

  const { t } = useLocalization()

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Deposit
  )
  const to = makeContextualHref('topup')

  return (
    <PageWithBackHeader header={{ title: 'Deposit' }}>
      <Text sx={{ my: '$6', mx: '$4' }}>{t('deposit.choose')}</Text>
      {isLoading && <ActivityIndicator />}
      <Button onPress={() => push(to, `/deposit/topup`)}>
        <Button.Label>aa</Button.Label>
      </Button>
      <View sx={{ position: 'relative', mx: '$4' }}>
        {data && (
          <FlatList
            scrollEnabled={false}
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
              />
            )}
          />
        )}
        <Seperator />
      </View>
      <RecentTransactions />
    </PageWithBackHeader>
  )
}

const Seperator = styled(View)({
  width: 1,
  bg: '#33A0D0',
  height: '100%',
  position: 'absolute',
  alignSelf: 'center',
})

export default withContextualNav(Deposit, 'deposit')
