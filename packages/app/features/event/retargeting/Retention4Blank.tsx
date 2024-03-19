import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import PacketClose from './PacketClose'

const Retention4Blank = () => {
  const { t } = useLocalization()
  const { width, height } = useWindowDimensions()
  const { push } = useRouter()
  const { openModal } = useModal()
  const desktop = useIsDesktop()
  const lang = useAppSelector((state) => state.setting.locale)

  const angpaoWidth = height > 700 ? Math.min(width * 0.6, 300) : 200
  const titleWidth = Math.min(width * 0.9, 400)

  const handleOpen = () => {
    desktop ? openModal('LoginModal') : push('/auth/login')
  }

  return (
    <View sx={{ width: '100%', height, alignItems: 'center' }}>
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/bg.jpg`}
        fill
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        contentPosition={'top center'}
        contentFit="fill"
        alt=""
      />

      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/title-try-${lang}.png`}
        width={titleWidth}
        height={titleWidth / (570 / 95)}
        style={{
          position: 'absolute',
          top: '20%',
        }}
        alt=""
      />

      <PacketClose angpaoWidth={angpaoWidth} onRedeem={handleOpen} />
    </View>
  )
}

export default Retention4Blank
