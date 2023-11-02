import { createSelector } from '@reduxjs/toolkit'
import FormContainer from 'app/components/form/FormContainer'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ModalStackParams } from 'app/provider/modal'
import { ActivityIndicator, P, Row, ScrollView, View } from 'dripsy'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useModal } from 'react-native-modalfy'
import { useGetCoinRedemptionListQuery } from 'services/rewardApi'
import { CoinRedemptionRow } from 'services/rewardApi.type'
import { useRouter } from 'solito/router'
import RewardCard, { RewardGameTag } from './components/RewardCard'
import RewardCardFull from './components/RewardCardFull'
import { RewardGameKeyMap } from 'utils/rewards'
import { Platform } from 'react-native'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SectionHeader from 'app/components/SectionHeader'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'

type RewardGameListConfig = {
  key: RewardGameKeyMap
  image: string
  tag?: RewardGameTag
  route?: string
}

const STATIC_IMAGE_URL = `${MEDIA_DOMAIN}${CONTENT_URI}/rewards/images`
const rewardGameListConfig: Array<RewardGameListConfig> = [
  {
    key: RewardGameKeyMap.SPIN_N_WIN,
    image: `${STATIC_IMAGE_URL}/spin_win.jpg`,
    // tag: RewardGameTag.NEW,
    route: '/rewards/games/spin-and-win',
  },
  {
    key: RewardGameKeyMap.ANGPAO_HUNT,
    image: `${STATIC_IMAGE_URL}/lucky_angpao.jpg`,
    // tag: RewardGameTag.HOT,
    route: '/rewards/games',
  },
  {
    key: RewardGameKeyMap.GOLDEN_CAT,
    image: `${STATIC_IMAGE_URL}/lucky_catspin.jpg`,
  },
  {
    key: RewardGameKeyMap.MYSTERY_DROP,
    image: `${STATIC_IMAGE_URL}/mega.jpg`,
    route: '/rewards/games/fortune-cat',
  },
  {
    key: RewardGameKeyMap.FORTUNE_CAT,
    image: `${STATIC_IMAGE_URL}/mega.jpg`,
    route: '/rewards/games/fortune-cat',
  },
]

const RewardGameList = ({ onLoaded }: { onLoaded?: () => void }) => {
  const { push } = useRouter()
  const { openModal } = useModal<ModalStackParams>()
  const isDesktop = useIsDesktop()
  const { t } = useLocalization()
  const lang = useAppSelector((state) => state.setting.locale)

  const matchRedemptionListData = useMemo(() => {
    return createSelector(
      (res: { data?: CoinRedemptionRow[] }) => res.data,
      (data) => {
        const combinedData = data?.map((game) => {
          const selectedGame = rewardGameListConfig.find(
            (rewardGame) => rewardGame.key === game.key
          )

          const mysteryGame = rewardGameListConfig[3]
          return {
            ...game,
            _data: mysteryGame,
          }
        })

        return combinedData
      }
    )
  }, [])

  const { data, isFetching, isLoading, isUninitialized, refetch } =
    useGetCoinRedemptionListQuery(undefined, {
      selectFromResult: (result) => {
        return {
          ...result,
          data: matchRedemptionListData(result),
        }
      },
    })

  useEffect(() => {
    // Inform parent that the api to get rewards list has been completed
    if (!isUninitialized && data) {
      setTimeout(() => onLoaded && onLoaded(), 100)
    }
  }, [isUninitialized, data])

  useEffect(() => {
    refetch()
  }, [lang])

  const [gameList, lastGameList] = useMemo(() => {
    if (!data) {
      return [[], []]
    }

    const lastIndex = data.length - 1
    const gameList = data.slice(0, lastIndex)
    const lastGameList = data.slice(lastIndex)

    return [gameList, lastGameList]
  }, [data])

  const onOpeningGame = useCallback(
    (gameKey: RewardGameKeyMap) => {
      if (isDesktop) {
        openModal('RewardGameModal', { persistent: true, key: gameKey })
      } else {
        push({
          pathname: '/rewards/launcher',
          query: {
            key: gameKey,
          },
        })
      }
    },
    [isDesktop, openModal, push]
  )

  if (isLoading) {
    return (
      <ActivityIndicator size={20} color={'$primary.300'} sx={{ my: '$3' }} />
    )
  }

  if (!data) {
    return null
  }

  return (
    <ScrollView contentContainerSx={{ my: '$sectionBottomSpace' }}>
      {isDesktop ? null : (
        <SectionHeader
          icon="vui-coin"
          title={t('rewards.scrollMenu.redeem').toUpperCase()}
          titleProps={{
            sx: {
              fontSize: 16,
            },
          }}
        />
      )}
      <FormContainer
        hidePadding
        sx={{
          p: '$3',
          maxWidth: 600,
          alignSelf: 'center',
        }}
      >
        <Row
          sx={{
            gap: ['$3'],
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {gameList.map((game) => {
            const { cost, name, key, _data } = game

            if (!_data) {
              return null
            }

            return (
              <RewardCard
                key={key}
                gameKey={_data.key}
                cost={cost}
                gameName={name}
                src={_data.image}
                tag={_data.tag}
                onOpeningGame={onOpeningGame}
              />
            )
          })}
        </Row>

        <View sx={{ pt: '$6', pb: Platform.select({ web: 0, default: 20 }) }}>
          {lastGameList.map((lastGame) => {
            const { cost, key, name, _data } = lastGame

            if (!_data) {
              return null
            }

            return (
              <RewardCardFull
                key={key}
                cost={cost}
                gameName={name}
                src={_data?.image}
                onPress={() => {
                  onOpeningGame(_data.key)
                }}
              />
            )
          })}
        </View>
      </FormContainer>
    </ScrollView>
  )
}

export default RewardGameList
