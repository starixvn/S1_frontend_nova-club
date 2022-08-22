import { DripsyGradient } from 'app/components/Gradient'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Currency } from 'app/utils/constant'
import { styled, Text, View } from 'dripsy'
import { useMemo, useRef } from 'react'
import { useCommissionTableQuery } from 'services/contentApi'
import { usePlayerProfileQuery } from 'services/playerApi'

const MASTER_NAME = 'MASTER'

const GameRewards = () => {
  const { t } = useLocalization()
  const ref = useRef<number>(0)

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.data?.currency as Currency

  const { gameType, providerCode } = useAppSelector(
    (state) => state.gameLauncher
  )
  const { data: commissionData } = useCommissionTableQuery({
    currency,
  })
  const commisions = useMemo(
    () => commissionData?.data || [],
    [commissionData?.data]
  )

  const providerCommission = useMemo(
    () =>
      commisions.find((commission) => {
        const { system_code, game_type_code } = commission

        return system_code === providerCode && game_type_code === gameType
      }),
    [commisions, gameType, providerCode]
  )

  // const masterCommission = useMemo(
  //   () =>
  //     commisions.find((commission) => {
  //       return commission.system_code === MASTER_NAME
  //     }),
  //   [commisions]
  // )

  let { cash_player = 0 } = providerCommission || {}

  const getReward = () => {
    if (typeof providerCode === 'undefined') {
      return ref.current
    }

    // if (typeof providerCommission === 'undefined') {
    //   return masterCommission?.cash_player || '0'
    // }
    ref.current = Math.max(cash_player, 0)
    return ref.current
  }

  return (
    <StyledView>
      <DripsyGradient
        colors={['#133351', '#0D2035']}
        sx={{
          alignItems: 'center',
        }}
      >
        <Text sx={{ color: '#6397B7', py: '$2a', fontSize: 14 }}>
          {t('game.reward')}:{' '}
          <Text
            sx={{ color: '#FF7070', fontSize: 14 }}
          >{`${getReward()}%`}</Text>
        </Text>
      </DripsyGradient>
    </StyledView>
  )
}

const StyledView = styled(View)({
  borderTopWidth: 1,
  borderColor: '$lightNavyBlue',
  borderBottomWidth: 1,
  shadowColor: '#33A0D0',
  shadowOffset: {
    width: 10,
    height: 0,
  },
  shadowOpacity: 0.6,
  shadowRadius: 4,
  elevation: 20,
})

export default GameRewards
