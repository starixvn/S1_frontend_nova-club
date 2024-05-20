import { MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import { MatchLeagueId } from 'app/constants/recMatchMapping'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'
import { MatchHeader } from '../MatchListHeader'
import { getMatchTime } from '../MatchListTable'
import PageSwitcher from 'app/features/sportsbook/euro/PageSwitcher'

const ITEM_PER_PAGE = 6

const EuroMatches = ({ data }: { data: MatchResult[] }) => {
  const { t } = useLocalization()
  const [page, setPage] = useState(1)

  const filteredData = useMemo(
    () => data.slice(ITEM_PER_PAGE * (page - 1), ITEM_PER_PAGE * page),
    [data, page]
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
          maxPage={3}
          label={`${t('event.euro.sportsbook.gameStage')} ${page} of 3`}
        />
      </MatchHeader>

      <View sx={{ height: 24 }} />

      <FlashList
        // key={page}
        estimatedItemSize={100}
        data={filteredData}
        numColumns={3}
        renderItem={MatchCard}
      />
    </View>
  )
}

const MatchCard = ({ item, index }: { index: number; item: MatchResult }) => {
  const homeFlag = `${MEDIA_DOMAIN}/nvclub${item.HomeImagePath}`
  const awayFlag = `${MEDIA_DOMAIN}/nvclub${item.AwayImagePath}`

  const { matchDayjs } = getMatchTime(item.globalshowtime)
  const time = matchDayjs.format('DD MMM/hh:mm a').split('/')

  return (
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
        width: '95%',
        my: '$2',
      }}
    >
      <View>
        <MatchFlag flag={homeFlag} label={item.HomeName} />
        <MatchFlag flag={awayFlag} label={item.AwayName} />
      </View>
      <View>
        <Text sx={{ textAlign: 'right', mb: '$2' }}>{time[0]}</Text>
        <Text sx={{ textAlign: 'right' }}>{time[1]}</Text>
      </View>
    </Row>
  )
}

export const MatchFlag = ({ flag, label }) => {
  return (
    <Row sx={{ p: '$2', alignItems: 'center' }}>
      <View
        sx={{
          mr: '$3',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <SolitoImage
          src={flag}
          alt="away"
          width={30}
          height={30}
          loading="lazy"
        />
      </View>
      <Text>{label}</Text>
    </Row>
  )
}

export default EuroMatches
