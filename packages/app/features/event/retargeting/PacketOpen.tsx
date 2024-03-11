import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Pressable, View, styled } from 'dripsy'
import { MotiView } from 'moti'
import React from 'react'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import { BoldText } from './components/BoldText'

const PacketOpen = ({ angpaoWidth, onRedeem }) => {
  const { t } = useLocalization()
  const { push } = useRouter()

  const handlePlay = () => {
    // push('/slots')
    onRedeem()
  }

  return (
    <MotiView
      from={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        position: 'absolute',
        bottom: '33%',
        alignItems: 'center',
      }}
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
              top: 60,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          >
            <PacketText sx={{ fontSize: 18, mb: '$3' }}>
              {t('retargeting.receive')}
            </PacketText>
            <PacketText sx={{ fontSize: 28 }}>XXXK VND</PacketText>
          </View>
        </View>

        <Pressable
          onPress={handlePlay}
          sx={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 40,
          }}
        >
          <>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/btn-play.png`}
              width={150}
              height={54}
              alt=""
            />
            <BoldText sx={{ position: 'absolute', color: 'white' }}>
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
