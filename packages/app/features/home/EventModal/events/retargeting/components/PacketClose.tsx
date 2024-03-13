import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, Pressable, View, useResponsiveValue } from 'dripsy'
import { MotiView } from 'moti'
import React, { useMemo } from 'react'
import { SolitoImage } from 'solito/image'
import { BoldText } from './BoldText'

const PacketClose = ({ angpaoWidth, isLoading = false, onRedeem }) => {
  const angpaoWidthMultiplier = useResponsiveValue([2, 2.25])
  const { t } = useLocalization()

  const handleOpen = () => {
    onRedeem()
  }

  const AnimatedGlow = useMemo(
    () => (
      <MotiView
        key="glow-rotate"
        from={{ rotate: '0deg' }}
        animate={{ rotate: '360deg' }}
        transition={{
          loop: true,
          repeatReverse: false,
          type: 'timing',
          duration: 500,
        }}
        style={{ position: 'absolute' }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/btn-glow.png`}
          width={angpaoWidth / (angpaoWidthMultiplier * 0.65)}
          height={angpaoWidth / (angpaoWidthMultiplier * 0.65)}
          alt=""
        />
      </MotiView>
    ),
    []
  )

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
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/angpao-close.png`}
          width={angpaoWidth}
          height={angpaoWidth / (470 / 590)}
          alt=""
        />

        <Pressable
          onPress={handleOpen}
          disabled={isLoading}
          sx={{
            position: 'absolute',
            mt: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/btn-open.png`}
              width={angpaoWidth / angpaoWidthMultiplier}
              height={angpaoWidth / angpaoWidthMultiplier}
              alt=""
            />
            <View
              sx={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <BoldText sx={{ fontSize: [20, 24] }}>
                    {t('common.open')}
                  </BoldText>
                  {AnimatedGlow}
                </>
              )}
            </View>
          </>
        </Pressable>
      </View>
    </MotiView>
  )
}

export default PacketClose
