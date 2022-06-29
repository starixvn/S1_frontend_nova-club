import { styled, Text, View } from 'dripsy'
import Icon from 'app/components/Icon'
import RoundedIcon from 'app/components/RoundedIcon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { useRouter } from 'solito/router'
import { PlayerBalanceResult } from 'services/wallet.type'
import { toCurrency, toDisplayAmount } from 'app/utils'
import { Currency } from 'app/utils/constant'

interface GameAmountProps {
  playerBalance: PlayerBalanceResult | undefined
}

interface FieldData {
  icon: string
  label: string
  apiKey?: keyof PlayerBalanceResult['main']
}

const GameAmount = ({ playerBalance }: GameAmountProps) => {
  const { main } = playerBalance || {}

  const fieldData: FieldData[] = [
    {
      icon: 'cash',
      label: 'Cash (VND)',
    },
    {
      icon: 'gift',
      label: 'Rewards (VND)',
      apiKey: 'reward',
    },
  ]

  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.PreLaunchGame
  )
  const to = makeContextualHref('deposit')
  const handleOnPress = () => {
    push(to, `/deposit`)
  }

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
          {toCurrency(Number(main?.balance), Currency.VND, {
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
        Balance
      </StyleLabel>
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View sx={{ flex: 0.92, borderRightWidth: 1, borderColor: '#00C5D4' }}>
          <ListItem data={fieldData} balance={main} />
        </View>
        <RoundedIcon
          size={'sm'}
          gradient="lightRed"
          icon="deposit"
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
  const getBalance = (apiKey: string | undefined) => {
    if (!balance || !apiKey) return 0

    return balance[apiKey]
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
                  size={i.icon === 'gift' ? 12 : 10}
                />
              </StyledWrapIcon>
              <StyleLabel
                sx={{
                  ml: '$1',
                }}
              >
                {i.label}
              </StyleLabel>
            </StyledWrapLabel>
            <View sx={{ flex: 0.1 }}>
              <StyleLabel>{getBalance(i.apiKey)}</StyleLabel>
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
  flex: 0.9,
})

const StyledWrapIcon = styled(View)({
  borderWidth: 0.5,
  borderColor: '#00C5D4',
  borderRadius: 10,
  bg: '$background',
  justifyContent: 'center',
  alignItems: 'center',
  height: 20,
  aspectRatio: 1,
})

const StyledText = styled(Text)({
  color: '#00FFFF',
  pb: '$2a',
})

const StyleLabel = styled(Text)({
  color: '#00C5D4',
  fontSize: 12,
})

export default GameAmount
