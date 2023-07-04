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
import { Row, ScrollView, Text, View } from 'dripsy'
import React from 'react'
import { League, MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'
import { CONTENT_URI, MEDIA_DOMAIN } from '../../../../apps/next/config/env'
import Button from 'app/components/common/Button'
dayjs.extend(customParseFormat)

interface MatchListTableProps {
  data?: League
  fullData: Dictionary<League>
  leagueId: EntityId
  allLeagueId: EntityId[]
  selectedTime: string
}

interface MatchListCellData {
  item: MatchResult
  selectionType: string
  flag?: string
  dateTime?: string
  name?: string
}

const handicapTypeArr = [
  MatchHandicapType.FULL_TIME,
  MatchHandicapType.FULL_TIME_OVER,
  MatchHandicapType.FULL_TIME_DOUBLE,
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
  const filterEndDate = dayjs(selectedTime).add(1, 'day')
  const filterStartDate = filterEndDate.add(-1, 'day')
  console.log(fullData)

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
}: MatchListCellData) => {
  return (
    <DataTableRow>
      <DataTableCell
        containerStyle={{
          flex: 0.1,
          alignItems: selectionType === 'home' ? 'flex-end' : 'flex-start',
        }}
      >
        {dateTime}
      </DataTableCell>
      <DataTableCell containerStyle={{ flex: 0.05 }}>
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
        containerStyle={{ maxWidth: 100, ml: '$2' }}
      >
        {name ?? 'Draw'}
      </DataTableCell>
      <DataTableCell
        containerStyle={{ justifyContent: 'flex-start', ml: '$4' }}
      >
        {handicapTypeArr.map((d, i) => {
          //Length is 3 if it is 1x2 Full Time & 1x2 Half Time
          //Selection ID 0 is Home while 1 is Away,
          //Selection ID for Away is 2 when it is 1x2 Full Time & 1x2 Half Time (Length===2)
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
            d === MatchHandicapType.HALF_TIME_DOUBLE
              ? true
              : false
          return (
            <View
              key={i}
              sx={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <DataTableCell
                containerStyle={{ flex: 1 }}
                textStyle={{ color: getBetColor(point), maxWidth: 40 }}
              >
                {!isTimeDouble && !!!(selectionType === 'draw') ? point : ''}
              </DataTableCell>
              {selectionType === 'draw' ? (
                <DataTableCell
                  containerStyle={{
                    flex: 1,
                  }}
                  textStyle={{
                    color: isTimeDouble ? '#ffcc00' : 'white',
                    maxWidth: 40,
                  }}
                >
                  {isTimeDouble ? item.selection[d]?.[1]?.Price : ''}
                </DataTableCell>
              ) : (
                <DataTableCell
                  containerStyle={{
                    flex: 1,
                  }}
                  textStyle={{
                    color: isTimeDouble ? '#ffcc00' : 'white',
                    maxWidth: 40,
                  }}
                >
                  {price}
                </DataTableCell>
              )}

              <DataTableCell
                containerStyle={{ flex: 1 }}
                textStyle={{
                  color: getBetColor(invertedPoint),
                  maxWidth: 40,
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
      <DataTableCell
        // textStyle={{ textAlign: 'center' }}
        containerStyle={{ flex: 0.1, mr: '$4' }}
      >
        {selectionType === 'away' ? (
          <Button contentProps={{ sx: { py: '$2', px: '$3' } }}>Bet Now</Button>
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
}: {
  item: MatchResult
  index: number
  selectedTime: string
  filterEndDate: dayjs.Dayjs
  filterStartDate: dayjs.Dayjs
}) => {
  const homeFlag = getFlagPath(item.HomeName)
  const awayFlag = getFlagPath(item.AwayName)
  const { date, matchUnixDate, time } = getMatchTime(item.globalshowtime)
  if (
    matchUnixDate >= filterEndDate.unix() ||
    matchUnixDate <= filterStartDate.unix()
  ) {
    return null
  } else {
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
        />
        <MatchListCellData
          // dateTime={date}
          // flag={awayFlag}
          item={item}
          // name={item.AwayName}
          selectionType={'draw'}
        />
      </View>
    )
  }
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
  try {
    const gmt8 = dayjs(globalshowtime, 'MM/DD hh:mmA')
    const gmt7 = dayjsTz(gmt8)

    if (gmt7.isValid()) {
      time = gmt7.format('HH:mm')
      date = gmt7.format('DD/MM')
      matchUnixDate = gmt7.unix()
    }
  } catch (e) {
    // Android Hermes will hit error if using dayjsTz
  }
  return { time, date, matchUnixDate }
}

export default MatchListTable
