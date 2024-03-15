import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { getErrorMessage } from 'app/utils/validation'
import { ScrollView, View, useResponsiveValue } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import React, { memo, useMemo, useState } from 'react'
import { useModal } from 'react-native-modalfy'
import { useRetentionSpinMutation } from 'services/playerApi'
import { SolitoImage } from 'solito/image'
import { useHomeEventModal } from '../../HomeEventModal'
import PacketClose from './components/PacketClose'
import PacketOpen from './components/PacketOpen'

type Props = { code: string }

const PrizePool = {
  1: 30000,
  2: 50000,
  3: 80000,
  4: 100000,
}

const RetargetingContent = memo(({ code }: Props) => {
  const { width, height } = useHomeEventModal().dimension
  const [isLoading, setIsLoading] = useState(false)
  const [redeemed, setRedeemed] = useState(false)
  const [amount, setAmount] = useState()
  const { openModal, closeModal } = useModal()
  const [retentionSpin] = useRetentionSpinMutation()
  const angpaoWidthMultiplier = useResponsiveValue([0.55, 0.5, 0.4])

  const imageWidth = Math.min(450, width * 0.95)
  const imageHeight = imageWidth / (900 / 1100)

  const angpaoWidth = Math.max(width * angpaoWidthMultiplier, 160)
  const titleWidth = angpaoWidth * 1.5

  const handleRedeem = async () => {
    try {
      setIsLoading(true)

      const { data, success } = await retentionSpin({ code })
        .unwrap()
        .catch((error) => {
          openModal('AlertModal', {
            message: getErrorMessage(error),
            onClose: () => closeModal(),
          })
          return error
        })

      if (success && data) {
        setAmount(PrizePool[data.code])
        setRedeemed(true)
      }
    } catch (error) {
      console.log('🚀 ~ Retargeting ~ error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const AnimatedTitleOpen = useMemo(
    () => (
      <MotiView
        key="title-congrats"
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/title-congrats-vi.png`}
          width={titleWidth}
          height={titleWidth / (512 / 63)}
          alt=""
        />
      </MotiView>
    ),
    []
  )

  const AnimatedTitleClose = useMemo(
    () => (
      <MotiView
        key="title-share"
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/title-share-vi.png`}
          width={titleWidth}
          height={titleWidth / (600 / 130)}
          alt=""
        />
      </MotiView>
    ),
    []
  )

  return (
    <View sx={{ height: Math.min(height, imageHeight) }}>
      <ScrollView bounces={false}>
        <View
          sx={{
            width: imageWidth,
            height: imageHeight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 18,
            overflow: 'hidden',
          }}
        >
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/retention4/bg-short.png`}
            fill
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            contentPosition={'bottom center'}
            contentFit="cover"
            alt=""
          />

          <View sx={{ position: 'absolute', top: 24, alignItems: 'center' }}>
            <AnimatePresence>
              {redeemed ? <>{AnimatedTitleOpen}</> : <>{AnimatedTitleClose}</>}
            </AnimatePresence>
          </View>

          <AnimatePresence>
            {redeemed ? (
              <PacketOpen
                amount={amount}
                angpaoWidth={angpaoWidth}
                onRedeem={handleRedeem}
              />
            ) : (
              <PacketClose
                angpaoWidth={angpaoWidth}
                isLoading={isLoading}
                onRedeem={handleRedeem}
              />
            )}
          </AnimatePresence>
        </View>

        {/* {isLoading ? (
          <View
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator
              size="large"
              color="$primary.100"
              sx={{ position: 'absolute' }}
            />
          </View>
        ) : null} */}
      </ScrollView>
    </View>
  )
})

export default RetargetingContent
