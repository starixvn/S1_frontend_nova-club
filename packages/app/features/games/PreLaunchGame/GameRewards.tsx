import MenuNotice from 'app/components/common/MenuNotice'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { REWARDS_NOTES } from 'app/constant/notes'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Currency } from 'app/utils/constant'
import { styled, Text, View } from 'dripsy'
import { useMemo, useRef } from 'react'
import { useModal } from 'react-native-modalfy'
import { useCommissionTableQuery } from 'services/contentApi'
import { usePlayerProfileQuery } from 'services/playerApi'

const GameRewards = () => {
  const { t } = useLocalization()
  const { openModal } = useModal()
  const ref = useRef<number>(0)

  const { data: playerData } = usePlayerProfileQuery()
  const currency = playerData?.currency as Currency

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

  let { cash_player = 0 } = providerCommission || {}

  const getReward = () => {
    if (typeof providerCode === 'undefined') {
      return ref.current
    }

    ref.current = Math.max(cash_player, 0)
    return ref.current
  }

  const { left } = useSafeArea()

  return (
    <StyledView>
      <DripsyGradient
        colors={['#133351', '#0D2035']}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text sx={{ color: '#6397B7', py: '$2a', fontSize: 14 }}>
          {t('game.reward')}:{' '}
          <Text
            sx={{ color: '#FF7070', fontSize: 14 }}
          >{`${getReward()}%`}</Text>
        </Text>

        <View
          sx={{
            position: 'absolute',
            right: 0,
          }}
        >
          <MenuNotice
            onPress={() =>
              openModal('NoticeModal', {
                notice: REWARDS_NOTES,
                noticeModule: 'Rewards',
              })
            }
          />
        </View>
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
