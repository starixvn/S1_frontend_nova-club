import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { Platform } from 'react-native'

const QRPayScreen = () => {
  const { t } = useLocalization()
 
  return (
    <PageWithBackHeader
      disableScrollView={Platform.OS === 'ios'}
      header={{ title: t('deposit.qrPay') }}
    >
      <QRPayScreen />
    </PageWithBackHeader>
  )
}

export default QRPayScreen
