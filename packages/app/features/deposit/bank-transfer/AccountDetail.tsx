import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import IconButton from 'app/components/IconButton'
import Image from 'app/components/common/Image'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { Text, View, useResponsiveValue } from 'dripsy'

type AccountDefailProps = {
  accountName: string
  accountNumber: string
  qrCode?: string
}

const AccountDetail = ({
  accountName,
  accountNumber,
  qrCode,
}: AccountDefailProps) => {
  const { t } = useLocalization()
  const horizontalMode = useResponsiveValue([false, false, false, true, true])

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
        <View>
          <View>
            <Text>{t('bank.accountName')} :</Text>
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View>
                <Text>{accountName}</Text>
              </View>

              <View>
                <IconButton
                  name={'copy'}
                  color={'white'}
                  size={12}
                  onPress={() => copyToClipboard(accountName)}
                />
              </View>
            </View>
          </View>
          <View sx={{ mt: '$2' }}>
            <Text>{t('bank.accountNo')} :</Text>
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text>{accountNumber}</Text>
              <IconButton
                name={'copy'}
                color={'white'}
                size={12}
                onPress={() => copyToClipboard(accountNumber)}
              />
            </View>
          </View>
        </View>

        <View>
          {qrCode ? (
            <View
              sx={{ justifyContent: 'center', alignItems: 'center', py: 12 }}
            >
              <Image
                alt={qrCode}
                source={{
                  uri: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${qrCode}`,
                }}
                sx={{ width: 120, height: 120 }}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default AccountDetail
