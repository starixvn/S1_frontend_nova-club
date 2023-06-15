import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { styled, Text, View } from 'dripsy'
import { usePlayerProfileQuery } from 'services/playerApi'

type Amount = string | number

interface SummarySectionProps {
  title: string
  amountWL: Amount
  amountTO: Amount
  amountRB: Amount
  amountDirect?: Amount
}

const SummarySection = ({
  title,
  amountWL,
  amountTO,
  amountRB,
  amountDirect,
}: SummarySectionProps) => {
  const { t } = useLocalization()
  // console.log('amountDirect', amountDirect, typeof amountDirect)
  return (
    <StyledContainer>
      <View
        sx={{
          overflow: 'hidden',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          borderBottomWidth: 1,
          borderColor: '$primary.100',
          bg: '$primary.300',
        }}
      >
        <StyledTitle>{title.toUpperCase()}</StyledTitle>
      </View>
      <TopInfo label={t('profile.w/l')} amount={amountWL} />
      {amountDirect !== undefined && (
        <TopInfo
          label={t('profile.direct')}
          amount={amountDirect}
          isCurrency={false}
        />
      )}
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <BottomInfo label={t('common.turnOver')} amount={amountTO} />
        <View sx={{ width: 1, bg: '$primary.100' }} />
        <BottomInfo label={t('common.realBet')} amount={amountRB} />
      </View>
    </StyledContainer>
  )
}

const TopInfo = ({
  label,
  amount,
  isCurrency = true,
}: {
  label: string
  amount: Amount
  isCurrency?: boolean
}) => {
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency
  return (
    <View
      sx={{
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '$primary.100',
        alignItems: 'center',
      }}
    >
      <Text sx={{ pt: '$3' }}>{label}</Text>
      <Text sx={{ pb: '$3' }}>
        {isCurrency
          ? toCurrency(amount ?? 0, currency, {
              symbol: false,
              hideTruncatedThousand: false,
            })
          : amount}
      </Text>
    </View>
  )
}

const BottomInfo = ({ label, amount }: { label: string; amount: Amount }) => {
  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

  return (
    <StyledBottomContainer>
      <Text sx={{ pt: '$3' }}>{label}</Text>
      <Text sx={{ pb: '$3' }}>
        {toCurrency(amount ?? 0, currency, {
          symbol: false,
          hideTruncatedThousand: false,
        })}
      </Text>
    </StyledBottomContainer>
  )
}

const StyledContainer = styled(View)({
  borderWidth: 1,
  borderColor: '$primary.100',
  m: '$4',
  mt: '$2',
  borderRadius: 15,
})

const StyledTitle = styled(Text)({
  p: '$3',
  fontWeight: 'bold',
  fontSize: 18,
})

const StyledBottomContainer = styled(View)({
  flex: 1,
  alignItems: 'center',
})

export default SummarySection
