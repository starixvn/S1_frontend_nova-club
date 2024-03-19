import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Pressable, View, styled } from 'dripsy'
import { MotiView } from 'moti'
import React from 'react'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import { BoldText } from './BoldText'
import { useModal } from 'react-native-modalfy'
import { appendWithThousandUnit, toCurrency } from 'app/utils'

const PacketOpen = ({ angpaoWidth, amount = 0, onRedeem }) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { closeModal } = useModal()

  const handlePlay = () => {
    push('/slots')
    closeModal()
  }

  return (
    <MotiView
      from={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <View
        sx={{
          mt: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View>
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/angpao-open.png`}
            width={angpaoWidth}
            height={angpaoWidth / (470 / 590)}
            alt=""
          />
          <View
            sx={{
              position: 'absolute',
              top: [40, 60],
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          >
            <PacketText sx={{ fontSize: [14, 18], mb: ['$3', '$4'] }}>
              {t('retargeting.receive')}
            </PacketText>
            <PacketText sx={{ fontSize: [22, 28] }}>{`${appendWithThousandUnit(
              amount.toString()
            )} VND`}</PacketText>
          </View>
        </View>

        <Pressable
          onPress={handlePlay}
          sx={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: [30, 40],
          }}
        >
          <>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/btn-play.png`}
              width={angpaoWidth / 1.4}
              height={angpaoWidth / 1.4 / (250 / 90)}
              alt=""
            />
            <BoldText
              sx={{ position: 'absolute', color: 'white', fontSize: [18, 24] }}
            >
              {t('common.playNow').toUpperCase()}
            </BoldText>
          </>
        </Pressable>
      </View>
    </MotiView>
  )
}

const PacketText = styled(BoldText)({
  color: '#AD020B',
})
export default PacketOpen
