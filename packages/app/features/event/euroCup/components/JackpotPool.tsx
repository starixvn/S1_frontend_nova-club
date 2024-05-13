import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import dayjs from 'dayjs'
import { Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { SolitoImage } from 'solito/image'
import { CountUp } from 'use-count-up'
import { sleep } from 'utils/common'

const INITIAL_JACKPOT = 100000000
const MAX_JACKPOT = 500000000
const JackpotPool = () => {
  const { t } = useLocalization()
  const imageWidth = useResponsiveValue([420, 500, 500, 500, 600])

  const [total, setTotal] = useState<number>(INITIAL_JACKPOT)
  const [prevPrize, setPrevPrize] = useState<number>(INITIAL_JACKPOT)

  const increment = (MAX_JACKPOT - INITIAL_JACKPOT) / (45 * 24 * 60 * 60)

  useEffect(() => {
    async function initTotal() {
      await sleep(1000)

      const startDate = dayjs('2024-05-01')
      const currentDate = dayjs()

      // Calculate the how much days passed in seconds
      const secondsPassed = currentDate.diff(startDate, 'second')

      const totalPoolPassed = total + increment * secondsPassed
      const initTotal =
        totalPoolPassed >= MAX_JACKPOT - INITIAL_JACKPOT
          ? MAX_JACKPOT
          : totalPoolPassed

      setTotal(Math.round(initTotal))
    }

    initTotal()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (total < MAX_JACKPOT) {
        setTotal((prevNumber) => {
          const newNumber = prevNumber + increment

          const total =
            newNumber >= MAX_JACKPOT - INITIAL_JACKPOT ? MAX_JACKPOT : newNumber

          return Math.round(total)
        })
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [total])

  return (
    <View
      sx={{
        width: imageWidth,
        height: imageWidth * (394 / 768),
        alignItems: 'center',
      }}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/logo.png`}
        fill
        alt=""
      />
      <View
        sx={{
          alignItems: 'center',
          position: 'absolute',
          bottom: [56, 70, '30%'],
        }}
      >
        <MainText sx={{ fontSize: 12 }}>
          {t('event.euro.prediction.jackpot').toUpperCase()}
        </MainText>
        {total && (
          <Row>
            <JackpotText>
              <CountUp
                key={total}
                isCounting
                start={prevPrize ? prevPrize : total}
                end={total}
                duration={0.5}
                easing="easeOutCubic"
                thousandsSeparator=","
                onComplete={() => setPrevPrize(total)}
              />
            </JackpotText>
            <JackpotText>{` VND`}</JackpotText>
          </Row>
        )}
      </View>
    </View>
  )
}

const MainText = styled(Text)({
  color: '#4F0018',
  fontWeight: 'bold',
  textAlign: 'center',
})

const JackpotText = styled(Text)({
  textAlign: 'right',
  fontSize: [20],
  color: '#4F0018',
  fontWeight: 'bold',
  fontFamily: 'arial',
  fontVariant: 'tabular-nums',
})

export default JackpotPool
