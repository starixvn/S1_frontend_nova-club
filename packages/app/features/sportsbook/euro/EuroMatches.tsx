import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import { SabaGamePayload } from 'app/constants/game'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import dayjs from 'dayjs'
import { Pressable, Row, Text, View } from 'dripsy'
import sortBy from 'lodash/sortBy'
import React, { useCallback, useMemo, useState } from 'react'
import { useGetEuroCupSportBookListQuery } from 'services/euroApi'
import { EuroCupMatchDetail } from 'services/euroApi.type'
import { Game } from 'services/gameApi.type'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'
import PageSwitcher from './PageSwitcher'

const EuroMatches = () => {
  const { push } = useRouter()
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const isDesktop = useIsDesktop()

  const [page, setPage] = useState(0)

  const { data } = useGetEuroCupSportBookListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const filteredData = useMemo(
    () => sortBy(data, 'sorting')?.[page],
    [data, page]
  )
  const getQueryParam = (param, url) => {
    const regex = new RegExp(`[?&]${param}=([^&]*)`)
    const match = regex.exec(url)
    return match ? decodeURIComponent(match[1]) : null
  }

  const onPress = useCallback(
    (match: string) => {
      const leagueKey = getQueryParam('leaguekey', match)
      const matchId = getQueryParam('matchid', match)

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
      } else push('/auth/login')
    },
    [isDesktop]
  )

  return (
    <View>
      <View sx={{ height: 50 }}>
        <PageSwitcher
          page={page}
          setPage={setPage}
          maxPage={data ? data?.length - 1 : 0}
          label={filteredData?.event_name}
        />
      </View>

      <FlashList
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
        style={{ padding: 12 }}
        contentContainerStyle={{ padding: 12 }}
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
  onPress: (arg0) => void
}) => {
  const homeFlag = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.home_team_image}`
  const awayFlag = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.away_team_image}`

  const time = dayjs(item.match_time, 'DD/MM hh:mma').format('DD MMM hh:mm a')

  const handlePress = () => {
    onPress(item.redirect)
  }

  return (
    <Pressable sx={{ width: '95%', my: '$2' }} onPress={handlePress}>
      <View
        sx={{
          p: '$2',
          bg: index % 6 < 3 ? '$primaryEuro.500' : 'transparent',
          borderWidth: 2,
          borderColor: '$primaryEuro.500',
          borderRadius: 12,
          justifyContent: 'center',
        }}
      >
        <Text sx={{ fontSize: 12 }}>{time}</Text>
        <View>
          <MatchFlag flag={homeFlag} label={item.home_team_name} />
          <MatchFlag flag={awayFlag} label={item.away_team_name} />
        </View>
      </View>
    </Pressable>
  )
}

const MatchFlag = ({ flag, label }) => {
  return (
    <Row sx={{ py: '$1', alignItems: 'center' }}>
      <View
        sx={{
          mr: '$1',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 50,
          overflow: 'hidden',
        }}
      >
        <SolitoImage
          src={flag}
          alt="away"
          width={20}
          height={20}
          loading="lazy"
        />
      </View>
      <Text numberOfLines={1} sx={{ fontSize: 14 }}>
        {label}
      </Text>
    </Row>
  )
}

export default EuroMatches
