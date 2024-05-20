import { MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import { MatchLeagueId } from 'app/constants/recMatchMapping'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { Row, Text, View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { matchGroupByLeague, useGetRecoMatchQuery } from 'services/matchApi'
import { MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'
import PageSwitcher from './PageSwitcher'

const ITEM_PER_PAGE = 12

const EuroMatches = () => {
  const { t } = useLocalization()
  const desktop = useIsDesktop()
  const [page, setPage] = useState(1)

  const { leagues, isFetching } = useGetRecoMatchQuery(
    { isApp: !desktop },
    {
      selectFromResult: (resp) => ({
        ...resp,
        leagues: matchGroupByLeague(resp),
      }),
    }
  )

  const filteredData = useMemo(
    () =>
      leagues?.entities[MatchLeagueId.EURO_CUP]?.slice(
        ITEM_PER_PAGE * (page - 1),
        ITEM_PER_PAGE * page
      ) ?? [],
    [leagues, page]
  )

  return (
    <View>
      <View sx={{ height: 50 }}>
        <PageSwitcher
          page={page}
          setPage={setPage}
          maxPage={3}
          label={`${t('event.euro.sportsbook.gameStage')} ${page} of 3`}
        />
      </View>

      <FlashList
        estimatedItemSize={100}
        data={filteredData}
        numColumns={3}
        renderItem={MatchCard}
        style={{ padding: 12 }}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  )
}

const MatchCard = ({ item, index }: { index: number; item: MatchResult }) => {
  const homeFlag = `${MEDIA_DOMAIN}/nvclub${item.HomeImagePath}`
  const awayFlag = `${MEDIA_DOMAIN}/nvclub${item.AwayImagePath}`

  const gmt8 = dayjs(item.globalshowtime, 'MM/DD hh:mmA')
  const gmt7 = dayjsTz(gmt8)

  const time = gmt7.format('DD MMM hh:mm a')

  return (
    <View
      sx={{
        p: '$2',
        bg: index % 6 < 3 ? '$primaryEuro.500' : 'transparent',
        borderWidth: 2,
        borderColor: '$primaryEuro.500',
        borderRadius: 12,
        justifyContent: 'center',
        width: '95%',
        my: '$2',
      }}
    >
      <Text sx={{ fontSize: 14 }}>{time}</Text>
      <View>
        <MatchFlag flag={homeFlag} label={item.HomeName} />
        <MatchFlag flag={awayFlag} label={item.AwayName} />
      </View>
    </View>
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
          borderRadius: 4,
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
