import DripsyMotiView from 'app/components/DripsyMotiView'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import ShadowButton from 'app/components/ShadowButton'
import GameCard from 'app/components/game/GameCard'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import { useInterval } from 'app/hooks/useInterval'
import { useAppSelector } from 'app/provider/redux/store'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Row, Text, View, styled } from 'dripsy'
import React, { startTransition, useEffect, useRef, useState } from 'react'
import { useLatestWinnerQuery } from 'services/gameApi'
import { LatestWinner, LatestWinnerType } from 'services/gameApi.type'

type Props = {
  type: LatestWinnerType
}

const SHOW_COUNT = 4

export default function LatestWinnerSection({ type }: Props) {
  const offsetIndexRef = useRef(SHOW_COUNT - 1)

  const { data } = useLatestWinnerQuery(type)

  const [display, setDisplay] = useState<LatestWinner[]>()
  useEffect(() => {
    if (data) setDisplay(data.slice(0, SHOW_COUNT))
  }, [data])

  useInterval(
    () => {
      if (data && data?.length > SHOW_COUNT) {
        offsetIndexRef.current += SHOW_COUNT
        if (offsetIndexRef.current > data.length - 1) {
          offsetIndexRef.current = 0
        }

        startTransition(() =>
          setDisplay(
            data.slice(
              offsetIndexRef.current,
              offsetIndexRef.current + SHOW_COUNT
            )
          )
        )
      }
    },
    data && data.length > SHOW_COUNT ? 6000 : null
  )

  if (!display) return null

  return (
    <View
      sx={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 2,
        borderColor: '$primary.300',
        overflow: 'hidden',
        height: 320,
      }}
    >
      <Header />
      <View
        sx={{
          flex: 1,
          p: '$2',
          gap: '$2',
        }}
      >
        {display.slice(0, 6).map((w, i) => {
          return (
            <LatestWinnerItem
              key={w.username}
              game={w.game}
              username={w.username}
              amount={w.amount}
            />
          )
        })}
      </View>
    </View>
  )
}

const LatestWinnerItem = ({ game, username, amount }) => {
  const locale = useAppSelector((s) => s.setting.locale)

  return (
    <DripsyMotiView
      key={username}
      from={{ rotateX: '90deg' }}
      animate={{ rotateX: 0 }}
      sx={{
        height: 60,
        borderRadius: 15,
        overflow: 'hidden',
      }}
    >
      <DripsyGradient
        colors={['$secondary.200', '$secondary.600']}
        sx={{
          p: '$1',
        }}
      >
        <Row sx={{ alignItems: 'center', gap: '$2' }}>
          <GameCard containerSx={{ height: 50 }} {...game} />
          <View sx={{ flex: 1, gap: '$1' }}>
            <Label>{username}</Label>
            <Label>{game.name[locale]}</Label>
          </View>
          <Label
            sx={{ ml: 'auto', fontWeight: 'bold', mr: '$2', fontSize: 16 }}
          >
            {toCurrency(amount, Currency.VND, {
              symbol: false,
            })}
          </Label>
        </Row>
      </DripsyGradient>
    </DripsyMotiView>
  )
}

const Label = styled(Text)({
  fontSize: 14,
})

const Header = () => {
  return (
    <Row
      sx={{
        bg: '$primary.300',
        px: '$3',
        py: '$2',
        alignItems: 'center',
        gap: '$2',
      }}
    >
      <ShadowButton
        safeRender
        containerStyle={{
          aspectRatio: 1 / 1,
          borderRadius: 24,
          py: '$1',
          px: '$1',
        }}
      >
        <Icon sx={{ fontSize: [10, 12] }} name={'star'} />
      </ShadowButton>
      <Text sx={{ mt: FONT_TOP_OFFSET, fontSize: 14, fontWeight: 'bold' }}>
        LATEST WINNERS
      </Text>
    </Row>
  )
}
