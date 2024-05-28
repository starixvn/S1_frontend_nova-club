import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { styled, Text, View } from 'dripsy'

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
  const currency = useAppSelector((state) => state.setting.currency)
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
  const currency = useAppSelector((state) => state.setting.currency)

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
