import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Text, View } from 'dripsy'

type MinMaxLimitDetailProps = {
  currency?: Currency
  minAmount?: string
  maxAmount?: string
}
const MinMaxLimitDetail = ({
  currency,
  maxAmount,
  minAmount,
}: MinMaxLimitDetailProps) => {
  const { t } = useLocalization()
  const horizontalMode = useIsDesktop()

  return (
    <View
      sx={{
        bg: '$primary.200',
        py: 2,
        px: horizontalMode ? 2 : 0,
        mb: 20,
      }}
    >
      <View
        sx={{
          bg: '$primary.500',
          flexDirection: 'row',
          py: '$3',
          px: '$4',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text>{t('deposit.minMaxLimit')} :</Text>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View>
            <Text>
              {toCurrency(minAmount ?? 0, currency, {
                symbol: false,
                forceDecimal: false,
              })}
              /
              {toCurrency(maxAmount ?? 0, currency, {
                symbol: false,
                forceDecimal: false,
              })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default MinMaxLimitDetail
