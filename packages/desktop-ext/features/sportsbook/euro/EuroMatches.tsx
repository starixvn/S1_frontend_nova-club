import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { FlashList } from '@shopify/flash-list'
import { MatchLeagueId } from 'app/constants/recMatchMapping'
import MatchFlag from 'app/features/sportsbook/euro/MatchFlag'
import PageSwitcher from 'app/features/sportsbook/euro/PageSwitcher'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import dayjs from 'dayjs'
import { Pressable, Row, Text, View } from 'dripsy'
import React, { useMemo, useState } from 'react'
import { useGetEuroCupSportBookListQuery } from 'services/euroApi'
import { EuroCupMatchDetail } from 'services/euroApi.type'
import { useRouter } from 'solito/router'
import { MatchHeader } from '../MatchListHeader'

const EuroMatches = () => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { showAlert } = useAlert()
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const [page, setPage] = useState(0)

  const { data } = useGetEuroCupSportBookListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const filteredData = useMemo(() => data?.[page], [data, page])

  const handlePress = (url) => {
    if (isLoggedIn) {
      push(url)
    } else showAlert(t('game.err.notLogin'))
  }

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
            onPress={(value) => handlePress(value)}
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
