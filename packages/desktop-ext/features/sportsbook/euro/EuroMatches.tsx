import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import { MatchLeagueId } from 'app/constants/recMatchMapping'
import MatchFlag from 'app/features/sportsbook/euro/MatchFlag'
import PageSwitcher from 'app/features/sportsbook/euro/PageSwitcher'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { useGetEuroCupSportBookListQuery } from 'services/euroApi'
import { EuroCupMatchDetail } from 'services/euroApi.type'
import { MatchHeader } from '../MatchListHeader'
import { getMatchTime } from '../MatchListTable'

const EuroMatches = () => {
  const { t } = useLocalization()
  const [page, setPage] = useState(0)

  const { data } = useGetEuroCupSportBookListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const filteredData = useMemo(() => data?.[page], [data, page])

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
        renderItem={MatchCard}
      />
    </View>
  )
}

const MatchCard = ({
  item,
  index,
}: {
  index: number
  item: EuroCupMatchDetail
}) => {
  const homeFlag = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.home_team_image}`
  const awayFlag = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.away_team_image}`

  const { matchDayjs } = getMatchTime(item.match_time)
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
        <MatchFlag flag={homeFlag} label={item.home_team_name} />
        <MatchFlag flag={awayFlag} label={item.away_team_name} />
      </View>
      <View>
        <Text sx={{ textAlign: 'right', mb: '$2' }}>{time[0]}</Text>
        <Text sx={{ textAlign: 'right' }}>{time[1]}</Text>
      </View>
    </Row>
  )
}

export default EuroMatches
