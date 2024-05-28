import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import { SabaGamePayload } from 'app/constants/game'
import { MatchLeagueId } from 'app/constants/recMatchMapping'
import MatchFlag from 'app/features/sportsbook/euro/MatchFlag'
import PageSwitcher from 'app/features/sportsbook/euro/PageSwitcher'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import dayjs from 'dayjs'
import { Pressable, Row, Text, View } from 'dripsy'
import sortBy from 'lodash/sortBy'
import React, { useCallback, useMemo, useState } from 'react'
import { useGetEuroCupSportBookListQuery } from 'services/euroApi'
import { EuroCupMatchDetail } from 'services/euroApi.type'
import { Game } from 'services/gameApi.type'
import { MatchHeader } from '../MatchListHeader'

const EuroMatches = () => {
  const { t } = useLocalization()
  const isDesktop = useIsDesktop()
  const { showAlert } = useAlert()
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const [page, setPage] = useState(0)

  const { data } = useGetEuroCupSportBookListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const filteredData = useMemo(
    () => sortBy(data, 'sorting')?.[page],
    [data, page]
  )

  const onPress = useCallback(
    (match: string) => {
      const params = new URLSearchParams(match)
      const leagueKey = params.get('leaguekey')
      const matchId = params.get('matchid')

      if (isLoggedIn) {
        getAction({
          type: ActionType.GAME,
          payload: {
            desktopMode: isDesktop,
            game: {
              ...SabaGamePayload,
              params: {
                leaguekey: leagueKey,
                matchid: matchId,
              },
            } as Game,
          },
        })()
      } else showAlert(t('game.err.notLogin'))
    },
    [isDesktop]
  )

  return (
    <View>
      <MatchHeader
        icon={MatchLeagueId.EURO_CUP}
        label={t('event.euro.sportsbook.eufa')}
        height={50}
      >
        <PageSwitcher
          page={page}
          setPage={setPage}
          maxPage={data ? data?.length - 1 : 0}
          label={filteredData?.event_name}
        />
      </MatchHeader>

      <View sx={{ height: 24 }} />

      <FlashList
        // key={page}
        estimatedItemSize={100}
        data={filteredData?.match_detail}
        numColumns={3}
        renderItem={({ item, index }) => (
          <MatchCard
            item={item}
            index={index}
            onPress={(value) => onPress(value)}
          />
        )}
      />
    </View>
  )
}

const MatchCard = ({
  item,
  index,
  onPress,
}: {
  index: number
  item: EuroCupMatchDetail
  onPress: (args0) => void
}) => {
  const homeFlag = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.home_team_image}`
  const awayFlag = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.away_team_image}`

  const time = dayjs(item.match_time, 'DD/MM hh:mma')
    .format('DD MMM/hh:mm a')
    .split('/')

  const handlePress = () => {
    onPress(item.redirect)
  }

  return (
    <Pressable sx={{ width: '95%', my: '$2' }} onPress={handlePress}>
      <Row
        sx={{
          p: '$3',
          px: '$4',
          bg: index % 6 < 3 ? '$primaryEuro.500' : 'transparent',
          borderWidth: 2,
          borderColor: '$primaryEuro.500',
          borderRadius: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <MatchFlag flag={homeFlag} label={item.home_team_name} />
          <MatchFlag flag={awayFlag} label={item.away_team_name} />
        </View>
        <View>
          <Text sx={{ textAlign: 'right', mb: '$2' }}>{time[0]}</Text>
          <Text sx={{ textAlign: 'right' }}>{time[1]}</Text>
        </View>
      </Row>
    </Pressable>
  )
}

export default EuroMatches
