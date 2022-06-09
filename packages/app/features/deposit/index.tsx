import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import { useDummyRtk } from 'utils/rtk'

const mapTypeToIcon = {}

const sampleData = [
  {
    type: 1,
    name: 'Bank Transfer',
  },
  {
    type: 2,
    name: 'Online Banking',
  },
  {
    type: 3,
    name: 'MOMO',
  },
  {
    type: 4,
    name: 'QR Code Transfer',
  },
  {
    type: 5,
    name: 'Top Up Card',
  },
  {
    type: 6,
    name: 'Crypto',
  },
]

const Deposit = () => {
  const { data, isLoading, isFetching } = useDummyRtk(sampleData)

  const { t } = useLocalization()
  return (
    <View>
      <Text>{t('deposit.deposit')}</Text>
    </View>
  )
}

export default Deposit
