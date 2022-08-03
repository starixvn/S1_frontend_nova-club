import { styled, Text, View } from 'dripsy'
import Icon from 'app/components/Icon'
import RoundedIcon from 'app/components/RoundedIcon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { useRouter } from 'solito/router'
import { PlayerBalanceResult } from 'services/wallet.type'
import { toCurrency, toDisplayAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'
import useLocalization from 'app/provider/localization'

interface GameAmountProps {
  playerBalance: PlayerBalanceResult | undefined
  isSeamless: boolean
}

interface FieldData {
  icon: string
  label: string
  apiKey?: keyof PlayerBalanceResult['main']
}

const GameAmount = ({ playerBalance, isSeamless }: GameAmountProps) => {
  const { t } = useLocalization()

  const { main } = playerBalance || {}

  // If its seamless, both cash and rewards amount will be used by the games,
  // Rewards amount will not be transfered into non seamless wallet
  const fieldData: FieldData[] = [
    {
      icon: 'ac',
      label: 'common.cash',
    },
    {
      icon: 'gift',
      label: 'common.rewards',
      apiKey: isSeamless ? undefined : 'reward',
    },
  ]

  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const to = makeContextualHref('deposit')
  const handleOnPress = () => {
    push(to, `/deposit`)
  }

  const cashInAmount = isSeamless
    ? Number(main?.balance) + Number(main?.reward)
    : Number(main?.balance)

  return (
    <View
      sx={{
        mx: '$2a',
      }}
    >
      <StyledView>
        <StyledText sx={{ fontSize: 20 }}>VND</StyledText>
        <StyledText sx={{ fontSize: 23 }}>
          {/* WIP: Currency should not be hardcoded here */}
          {toCurrency(cashInAmount, Currency.VND, {
            symbol: false,
            hideTruncatedThousand: false,
          })}
        </StyledText>
      </StyledView>
      <StyleLabel
        sx={{
          mt: '$1a',
        }}
      >
        {t('common.balance')}
      </StyleLabel>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          sx={{
            flex: 1,
            borderRightWidth: 1,
            mr: '$4',
            borderColor: '#00C5D4',
          }}
        >
          <ListItem data={fieldData} balance={main} />
        </View>
        <RoundedIcon
          sx={{ mr: '$2' }}
          size={'sm'}
          gradient="lightRed"
          icon="dac"
          onPress={handleOnPress}
        />
      </View>
    </View>
  )
}

interface ListItemProps {
  data: FieldData[]
  balance: PlayerBalanceResult['main'] | undefined
}

const ListItem = ({ data, balance }: ListItemProps) => {
  const { t } = useLocalization()
  const getBalance = (apiKey: string | undefined) => {
    if (!balance || !apiKey) return toCurrency(0)

    return toCurrency(balance[apiKey])
  }

  return (
    <View>
      {data.map((i, index) => {
        return (
          <StyledWrapItem key={i.label}>
            <StyledWrapLabel sx={{}}>
              <StyledWrapIcon>
                <Icon
                  name={i.icon}
                  color={'#00C5D4'}
                  size={15}
                  sx={{ p: '$1', alignSelf: 'center' }}
                />
              </StyledWrapIcon>
              <StyleLabel
                sx={{
                  ml: '$1',
                }}
              >
                {t(i.label)}
              </StyleLabel>
            </StyledWrapLabel>
            <View sx={{ px: '$4', flex: 1 }}>
              <StyleLabel sx={{ textAlign: 'right' }}>
                {getBalance(i.apiKey)}
              </StyleLabel>
            </View>
          </StyledWrapItem>
        )
      })}
    </View>
  )
}

const StyledView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 1,
  borderColor: '#00FFFF',
  mt: '$6',
  alignItems: 'center',
})

const StyledWrapItem = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  mt: '$1a',
  justifyContent: 'space-between',
})

const StyledWrapLabel = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  mr: '$4',
})

const StyledWrapIcon = styled(View)({
  borderWidth: 0.5,
  borderColor: '#00C5D4',
  borderRadius: 20,
  bg: '$background',
  justifyContent: 'center',
  alignItems: 'center',
  aspectRatio: 1,
  mr: '$1',
})

const StyledText = styled(Text)({
  color: '#00FFFF',
  pb: '$2a',
})

const StyleLabel = styled(Text)({
  color: '#00C5D4',
  fontSize: 14,
})

export default GameAmount
