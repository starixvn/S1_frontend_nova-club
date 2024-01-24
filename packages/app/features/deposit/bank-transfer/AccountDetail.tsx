import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import IconButton from 'app/components/IconButton'
import Image from 'app/components/common/Image'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { Pressable, Text, View } from 'dripsy'
import { useModal } from 'react-native-modalfy'

type AccountDefailProps = {
  accountName: string
  accountNumber: string
  qrCode?: string
  referenceCode?: string
}

const AccountDetail = ({
  accountName,
  accountNumber,
  qrCode,
  referenceCode,
}: AccountDefailProps) => {
  const { t } = useLocalization()
  const horizontalMode = useIsDesktop()
  const { openModal } = useModal()

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
          <View sx={{ mt: '$2' }}>
            <Text>{t('bank.receiptReference')} :</Text>
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text>{referenceCode}</Text>
              <IconButton
                name={'copy'}
                color={'white'}
                size={12}
                onPress={() => copyToClipboard(referenceCode)}
              />
            </View>
          </View>
        </View>

        <View>
          {qrCode ? (
            <Pressable
              onPress={() => openModal('DepositQrModal', { qrCode })}
              sx={{ justifyContent: 'center', alignItems: 'center', py: 12 }}
            >
              <Image
                alt={qrCode}
                source={{
                  uri: `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${qrCode}`,
                }}
                sx={{ width: 120, height: 120 }}
              />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default AccountDetail
