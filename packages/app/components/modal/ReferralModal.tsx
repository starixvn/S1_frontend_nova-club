import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import { Pressable, ScrollView, Text, View } from 'dripsy'
import React, { useRef } from 'react'
import withShare from 'app/hoc/withShare'
import { usePlayerProfileQuery } from 'services/playerApi'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'
import IconButton from '../IconButton'
import QRCodeGenerator from '../QRCodeGenerator'
import ViewScreenShot, { ViewScreenShotMethods } from '../ViewScreenShot'
import BouncePressable from '../pressable/BouncePressable'
import ModalWrapper from './ModalWrapper'
import { DEV_DOMAIN } from '../../../../apps/next/config/env'

const ReferralModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const { data } = usePlayerProfileQuery()

  const ref = useRef<ViewScreenShotMethods>(null)
  const referralCode = data?.referral_code
  const referralLink = `${DEV_DOMAIN}/download?ref=${referralCode}`

  const handleDownload = () => {
    ref?.current?.download()
  }

  return (
    <ModalWrapper>
      <>
        <DripsyGradient
          gradient={'surface'}
          sx={{
            alignItems: 'center',
            py: '$3',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <Text>{t('menu.friendReferral')}</Text>
        </DripsyGradient>
        <View
          sx={{
            p: '5%',
            bg: 'white',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        >
          <Text sx={{ color: 'black' }}>{t('referral.shareMessage')}</Text>
          <ViewScreenShot ref={ref} fileName={`Vui123-${referralCode}`}>
            <QRCodeGenerator isTransfer={false} referralLink={referralLink} />
          </ViewScreenShot>

          <View
            sx={{
              bg: '#EEE',
              py: '$2',
              px: '$3',
              borderRadius: 12,
            }}
          >
            <Text
              sx={{
                color: 'black',
                fontSize: 13,
                fontWeight: 'bold',
              }}
            >
              {t('referral.link')}
            </Text>
            <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                numberOfLines={1}
                sx={{ flex: 1, color: 'black', fontSize: 13 }}
              >
                {referralLink}
              </Text>
              <IconButton
                name="copy"
                size={20}
                color="black"
                sx={{ ml: '$1' }}
                onPress={() => copyToClipboard(referralLink)}
              />
            </View>
          </View>
          <View
            sx={{
              my: '$3',
              mx: '$4',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <ActionButton
              icon="dl-round"
              title={t('common.download')}
              onPress={handleDownload}
            />
            <ShareButton
              icon="tf"
              title={t('referral.share')}
              options={{
                message: t('referral.shareMessage'),
                url: referralLink,
                title: t('referral.share'),
              }}
            />
          </View>
          <Pressable onPress={() => closeModal()}>
            <DripsyGradient
              gradient={'surface'}
              sx={{ alignItems: 'center', borderRadius: 15, py: '$3' }}
            >
              <Text>{t('common.close')}</Text>
            </DripsyGradient>
          </Pressable>
        </View>
      </>
    </ModalWrapper>
  )
}

const ActionButton = ({ icon, title, onPress }) => {
  return (
    <BouncePressable
      sx={{ color: 'black', alignItems: 'center' }}
      onPress={onPress}
    >
      <Icon size={22} name={icon} color="black" />
      <Text sx={{ color: 'black', fontSize: 12, mt: '$1' }}>{title}</Text>
    </BouncePressable>
  )
}

const ShareButton = withShare(ActionButton)

export default ReferralModal
