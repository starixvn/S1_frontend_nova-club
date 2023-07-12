import { Dictionary, EntityId } from '@reduxjs/toolkit'
import { FlashList } from '@shopify/flash-list'
import Icon from 'app/components/Icon'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import {
  MatchHandicapType,
  MatchLeagueTabIconMapping,
} from 'app/constants/recMatchMapping'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Row, ScrollView, Text, View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { League, MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '../../../../apps/next/config/env'
import Button from 'app/components/common/Button'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { Game } from 'services/gameApi.type'
dayjs.extend(customParseFormat)

interface MatchListTableProps {
  data?: League
  fullData: Dictionary<League>
  leagueId: EntityId
  allLeagueId: EntityId[]
  selectedTime: string
}

interface MatchListCellDataProps {
  item: MatchResult
  selectionType: string
  flag?: string
  dateTime?: string
  name?: string
  onPress?: (match: MatchResult) => void
}

interface MatchListCellRowProps {
  index: number
  selectedTime: string
  time: string
  date: string
  homeFlag: string
  awayFlag: string
  item: MatchResult
  onPress: (match: MatchResult) => void
}

const handicapTypeArr = [
  MatchHandicapType.FULL_TIME,
  MatchHandicapType.FULL_TIME_OVER,
  MatchHandicapType.FULL_TIME_DOUBLE,
  MatchHandicapType.FULL_TIME_OVER_UNDER,
  MatchHandicapType.HALF_TIME,
  MatchHandicapType.HALF_TIME_OVER,
  MatchHandicapType.HALF_TIME_DOUBLE,
]

const MatchListTable = ({
  leagueId,
  fullData,
  allLeagueId,
  selectedTime,
}: MatchListTableProps) => {
  const filterStartDate = dayjs(selectedTime)
  const filterEndDate = filterStartDate.add(1, 'day')
  const isDesktop = useResponsiveValue([false, false, false, true])

  const onPress = (match: MatchResult) => {
    getAction({
      type: ActionType.GAME,
      payload: {
        desktopMode: isDesktop,
        game: {
          gc: '1',
          name: {
            en: 'SABA Sports',
            vi: 'SABA Sports',
          },
          gtc: 'sports',
          img: 'https://static-stage.gball8.com/nvclub/sbe/cms/game/saba/sport-saba_1659947637.png',
          gpc: 'SABA',
          tags: [],
          params: {
            leaguekey: match.LeagueId.toString(),
            matchid: match.EventId.toString(),
          },
        } as Game,
      },
    })()
  }

  return (
    <ScrollView
      key={selectedTime + leagueId}
      contentContainerSx={{
        overflow: 'visible',
        mb: '$sectionBottomSpace',
      }}
    >
      {leagueId ? (
        <FlashList
          key={leagueId + 'All' + selectedTime} // Update the key prop
          data={fullData[leagueId]}
          renderItem={({ index, item }) => (
            <OnRender
              key={selectedTime}
              index={index}
              item={item}
              selectedTime={selectedTime}
              filterEndDate={filterEndDate}
              filterStartDate={filterStartDate}
              onPress={onPress}
            />
          )}
          estimatedItemSize={40}
        />
      ) : (
        allLeagueId.map((l) => {
          return (
            <>
              <Row sx={{ mt: '$2', bg: '$primary.50', px: '$3', py: '$2' }}>
                <Icon
                  name={MatchLeagueTabIconMapping[l]}
                  sx={{ fontSize: [24, 30, 36] }}
                />
                <Text sx={{ py: '$2', fontSize: 18, fontWeight: 'bold' }}>
                  {fullData[l]?.[0]?.LeagueName}
                </Text>
              </Row>
              <FlashList
                key={leagueId + selectedTime} // Update the key prop
                data={fullData[l]}
                renderItem={({ index, item }) => (
                  <OnRender
                    index={index}
                    item={item}
                    selectedTime={selectedTime}
                    filterEndDate={filterEndDate}
                    filterStartDate={filterStartDate}
                    onPress={onPress}
                  />
                )}
                estimatedItemSize={40}
                //Display All League with specific date
              />
            </>
          )
        })
      )}
    </ScrollView>
  )
}

const MatchListCellData = ({
  item,
  selectionType,
  dateTime,
  flag,
  name,
  onPress,
}: MatchListCellDataProps) => {
  return (
    <DataTableRow>
      <DataTableCell
        sx={{
          flex: 0.075,
          alignItems: selectionType === 'home' ? 'flex-end' : 'flex-start',
        }}
        textStyle={{ fontWeight: 'bold' }}
      >
        {dateTime}
      </DataTableCell>
      <DataTableCell sx={{ flex: 0.025 }}>
        {flag && (
          <SolitoImage
            src={flag}
            alt="away"
            width={30}
            height={30}
            resizeMode="contain"
          />
        )}
      </DataTableCell>
      <DataTableCell
        textStyle={{ textAlign: 'center' }}
        sx={{ ml: '$2', flex: 0.1 }}
      >
        {name ?? 'Draw'}
      </DataTableCell>
      <DataTableCell
        sx={{
          justifyContent: 'flex-start',
          ml: '$2',
          flex: 1,
          px: 0,
        }}
      >
        {handicapTypeArr.map((d, i) => {
          //Length is 3 if it is 1x2 Full Time & 1x2 Half Time
          //Selection ID 0 is Home while 1 is Away,
          //Selection ID for Away is 2 when it is 1x2 Full Time & 1x2 Half Time (Length===2)
          //IsTimeDouble is to indicate the Selection ID 5 AND 15
          const selectionId =
            item.selection[d]?.length === 3
              ? 2
              : selectionType === 'away'
              ? 1
              : 0
          const price = item.selection[d]?.[selectionId]?.Price ?? 0
          const point = item.selection[d]?.[selectionId]?.Point ?? 0
          const invertedPoint = point > 0 ? -point : Math.abs(point)
          const isTimeDouble =
            d === MatchHandicapType.FULL_TIME_DOUBLE ||
            d === MatchHandicapType.HALF_TIME_DOUBLE ||
            d === MatchHandicapType.FULL_TIME_OVER_UNDER

          return (
            <View
              key={i}
              sx={{
                flexDirection: 'row',
                flex: isTimeDouble ? 0.5 : 1,
                justifyContent: 'center',
              }}
            >
              <DataTableCell
                sx={{
                  flex: isTimeDouble ? 0.5 : 1,
                  px: 0,
                }}
                textStyle={{ color: getBetColor(point) }}
              >
                {!isTimeDouble && !!!(selectionType === 'draw') ? point : ''}
              </DataTableCell>
              {selectionType === 'draw' ? (
                <DataTableCell
                  sx={{
                    flex: 1,
                    px: 0,
                  }}
                  textStyle={{
                    color: isTimeDouble ? '#ffcc00' : 'white',
                  }}
                >
                  {isTimeDouble && d !== MatchHandicapType.FULL_TIME_OVER_UNDER
                    ? item.selection[d]?.[1]?.Price
                    : ''}
                </DataTableCell>
              ) : (
                <DataTableCell
                  sx={{ flex: 1, px: 0 }}
                  textStyle={{
                    color: isTimeDouble ? '#ffcc00' : 'white',
                  }}
                >
                  {price}
                </DataTableCell>
              )}

              <DataTableCell
                sx={{
                  flex: isTimeDouble ? 0.5 : 1,
                  px: 0,
                }}
                textStyle={{
                  color: getBetColor(invertedPoint),
                  px: 0,
                }}
              >
                {!isTimeDouble && !!!(selectionType === 'draw')
                  ? invertedPoint
                  : ''}
              </DataTableCell>
            </View>
          )
        })}
      </DataTableCell>
      <DataTableCell sx={{ flex: 0.1, mr: '$4' }}>
        {selectionType === 'away' && onPress ? (
          <Button
            contentProps={{ sx: { py: '$1', px: '$2' } }}
            onPress={() => onPress(item)}
          >
            Bet Now
          </Button>
        ) : (
          ''
        )}
      </DataTableCell>
    </DataTableRow>
  )
}
const OnRender = ({
  item,
  index,
  selectedTime,
  filterEndDate,
  filterStartDate,
  onPress,
}: {
  item: MatchResult
  index: number
  selectedTime: string
  filterEndDate: dayjs.Dayjs
  filterStartDate: dayjs.Dayjs
  onPress: (match: MatchResult) => void
}) => {
  const homeFlag = getFlagPath(item.HomeName)
  const awayFlag = getFlagPath(item.AwayName)
  const { date, matchUnixDate, time, matchDayjs } = getMatchTime(
    item.globalshowtime
  )

  const endDate =
    selectedTime === 'All' ? dayjsTz(dayjs()).add(6, 'day') : filterEndDate
  const startDate = selectedTime === 'All' ? dayjsTz(dayjs()) : filterStartDate
  // console.log('-----------------------')
  // console.log('MatchDate', matchDayjs.format('DD/MM/YYYY || HH:MMA'))
  // console.log('Start: ', startDate.format('DD/MM/YYYY || HH:MMA'))
  // console.log('End: ', endDate.format('DD/MM/YYYY || HH:MMA'))
  // console.log(matchDayjs.subtract(startDate.day(), 'days').day())
  // console.log(endDate.subtract(matchDayjs.day(), 'days').day())

  if (
    selectedTime !== 'All' &&
    (endDate.subtract(matchDayjs.day(), 'days').day() === 1 ||
      matchDayjs.subtract(startDate.day(), 'days').day() === 0)
  ) {
    return (
      <MatchListCellRow
        awayFlag={awayFlag}
        date={date}
        homeFlag={homeFlag}
        index={index}
        item={item}
        onPress={onPress}
        selectedTime={selectedTime}
        time={time}
        key={selectedTime}
      />
    )
  } else if (
    selectedTime === 'All' &&
    (matchDayjs.subtract(startDate.day(), 'days').day() === 0 ||
      endDate.subtract(matchDayjs.day(), 'days').day() <= 6)
  ) {
    return (
      <MatchListCellRow
        awayFlag={awayFlag}
        date={date}
        homeFlag={homeFlag}
        index={index}
        item={item}
        onPress={onPress}
        selectedTime={selectedTime}
        time={time}
        key={selectedTime}
      />
    )
  } else {
    return null
  }
}

const MatchListCellRow = ({
  index,
  selectedTime,
  time,
  date,
  homeFlag,
  awayFlag,
  item,
  onPress,
}: MatchListCellRowProps) => {
  return (
    <View
      key={selectedTime}
      sx={{
        flex: 0,
        py: '$2',
        mt: '$2',
        bg: index % 2 ? '$primary.300' : '$primary.500',
      }}
    >
      <MatchListCellData
        dateTime={time}
        flag={homeFlag}
        item={item}
        name={item.HomeName}
        selectionType={'home'}
      />

      <MatchListCellData
        dateTime={date}
        flag={awayFlag}
        item={item}
        name={item.AwayName}
        selectionType={'away'}
        onPress={onPress}
      />
      <MatchListCellData item={item} selectionType={'draw'} />
    </View>
  )
}

const getBetColor = (val: number) => {
  return val === 0 ? 'white' : val < 0 ? '#ff8080' : '#99ff86'
}

const getFlagPath = (country: string) => {
  const cleanFileName = country.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')

  return `${MEDIA_DOMAIN}${CONTENT_URI}/flags/${cleanFileName}.png`
}

const getMatchTime = (globalshowtime: string) => {
  let time = '-'
  let date = '-'
  let matchUnixDate = 0
  let matchDayjs = {} as dayjs.Dayjs
  try {
    const gmt8 = dayjs(globalshowtime, 'MM/DD hh:mmA')
    const gmt7 = dayjsTz(gmt8)

    if (gmt7.isValid()) {
      time = gmt7.format('HH:mm')
      date = gmt7.format('DD/MM')
      matchUnixDate = gmt7.unix()
      matchDayjs = gmt7
    }
  } catch (e) {
    // Android Hermes will hit error if using dayjsTz
  }
  return { time, date, matchUnixDate, matchDayjs }
}

export default MatchListTable
