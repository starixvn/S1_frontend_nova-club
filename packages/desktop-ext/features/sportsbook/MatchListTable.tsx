import { Dictionary, EntityId } from '@reduxjs/toolkit'
import { FlashList } from '@shopify/flash-list'
import Accordian from 'app/components/Accordian'
import Icon from 'app/components/Icon'
import Button from 'app/components/common/Button'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import { SabaGamePayload } from 'app/constants/game'
import {
  MatchHandicapType,
  MatchLeagueTabIconMapping,
} from 'app/constants/recMatchMapping'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ActivityIndicator, Row, ScrollView, Text, View, styled } from 'dripsy'
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useWindowDimensions } from 'react-native'
import { Game } from 'services/gameApi.type'
import { League, MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'
import { MEDIA_DOMAIN } from '../../../../apps/next/config/env'
import DataTableTitle from 'app/components/dataTable/DataTableTitle'
import useIntersectionObserver from 'app/hooks/useIntersectionObserver'
import MatchListHeader from './MatchListHeader'
import { MotiView } from 'moti'
import { mergeRefs } from 'utils/mergeRefs'
dayjs.extend(customParseFormat)

interface MatchListTableProps {
  data: (EntityId | MatchResult)[]
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

const ROW_HEIGHT = 143

const MatchListTable = forwardRef(({ data }: MatchListTableProps, ref) => {
  const isDesktop = useIsDesktop()
  const flashListRef = useRef()

  const onPress = (match: MatchResult) => {
    getAction({
      type: ActionType.GAME,
      payload: {
        desktopMode: isDesktop,
        game: {
          ...SabaGamePayload,
          params: {
            leaguekey: match.LeagueId.toString(),
            matchid: match.EventId.toString(),
          },
        } as Game,
      },
    })()
  }

  const stickyHeaderIndices = data
    .map((item, index) => {
      if (typeof item === 'string') {
        return index
      } else {
        return null
      }
    })
    .filter((item) => item !== null) as number[]

  function jumpTo(index: number) {
    // ref.current?.scrollToIndex(stickyHeaderIndices[index])
    flashListRef.current.scrollToIndex({
      animated: true,
      index: index,
    })
  }

  useImperativeHandle(ref, () => {
    return {
      jumpTo,
    }
  })

  return (
    <View sx={{ height: 750 }}>
      <FlashList
        style={{ height: 500 }}
        ref={flashListRef}
        data={data}
        estimatedItemSize={143}
        stickyHeaderIndices={stickyHeaderIndices}
        getItemType={(item) => {
          // To achieve better performance, specify the type based on the item
          return typeof item === 'string' || typeof item === 'number'
            ? 'sectionHeader'
            : 'row'
        }}
        renderItem={({ index, item }) => {
          if (typeof item === 'string' || typeof item === 'number') {
            // Rendering header
            const sample = data.find(
              (m) => typeof m === 'object' && m.LeagueId.toString() === item
            )
            return <MatchListHeader data={sample} height={50} />
          } else {
            // Render item
            const homeFlag = `${MEDIA_DOMAIN}/nvclub${item.HomeImagePath}`
            const awayFlag = `${MEDIA_DOMAIN}/nvclub${item.AwayImagePath}`
            const { date, matchUnixDate, time, matchDayjs } = getMatchTime(
              item.globalshowtime
            )

            return (
              <View key={item}>
                <MatchListCellRow
                  awayFlag={awayFlag}
                  date={date}
                  homeFlag={homeFlag}
                  index={index}
                  item={item}
                  onPress={onPress}
                  time={time}
                />
              </View>
            )
          }
        }}
      />
    </View>
  )
})

const MatchListCellRow = ({
  index,
  time,
  date,
  homeFlag,
  awayFlag,
  item,
  onPress,
}: MatchListCellRowProps) => {
  const [inView, ref] = useIntersectionObserver()

  return (
    <View
      ref={ref}
      key={index + time + date}
      sx={{
        bg: index % 2 ? '$primary.300' : '$primary.500',
        // borderBottomWidth: 8,
        mb: '$2',
        // borderBottomColor: '$primary.700',
        height: 135,
      }}
    >
      {!inView ? null : (
        <MotiView
          from={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <MatchListCellData
            dateTime={date}
            flag={homeFlag}
            item={item}
            name={item.HomeName}
            selectionType={'home'}
          />
          <MatchListCellData
            dateTime={time}
            flag={awayFlag}
            item={item}
            name={item.AwayName}
            selectionType={'away'}
            onPress={onPress}
          />
          <MatchListCellData item={item} selectionType={'draw'} />
        </MotiView>
      )}
    </View>
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
    <DataTableRow sx={{ height: 45 }}>
      <DataTableCell
        sx={{
          py: '$0',
          flex: 0.07,
          alignItems: selectionType === 'home' ? 'flex-end' : 'flex-start',
        }}
        textStyle={{
          fontWeight: selectionType === 'away' ? 'bold' : 'bold',
          fontSize: selectionType === 'away' ? 14 : 17,
        }}
      >
        {dateTime}
      </DataTableCell>
      <DataTableCell
        sx={{
          flex: 0.015,
          py: '$1',
          alignItems: selectionType === 'home' ? 'flex-end' : 'flex-start',
        }}
      >
        {flag && (
          <SolitoImage
            // from={{ scale: 0, opacity: 0 }}
            // animate={{ scale: 1, opacity: 1 }}
            src={flag}
            // source={{ uri: flag }}
            alt="away"
            width={30}
            height={30}
            loading="lazy"
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        )}
      </DataTableCell>
      <DataTableCell
        textStyle={{ textAlign: 'center', fontSize: 13 }}
        sx={{
          ml: '$1',
          flex: 0.16,
          py: '$0',
          borderColor: 'rgba(255,255,255,0.6)',
        }}
      >
        {name ?? 'Draw'}
      </DataTableCell>
      <DataTableCell
        sx={{
          justifyContent: 'flex-start',
          flex: 1,
          px: 0,
          py: '$0',
          alignItems: 'stretch',
        }}
      >
        {handicapTypeArr.map((d, i) => {
          // console.log(i)
          //Length is 3 if it is 1x2 Full Time & 1x2 Half Time
          //Selection ID 0 is Home while 1 is Away,
          //Selection ID for Away is 2 when it is 1x2 Full Time & 1x2 Half Time (Length===2)
          //IsTimeDouble is to indicate the Selection ID 5 AND 15
          // const selectionId =
          //   item.selection[d]?.length === 3
          //     ? 2
          //     : selectionType === 'away'
          //     ? 1
          //     : 0

          //homeawaydraw
          const selectionId = getSelectionId({ selectionType, item, d })

          const price = item.selection[d]?.[selectionId]?.Price ?? 0
          const point = item.selection[d]?.[selectionId]?.Point ?? 0
          const invertedPoint = point > 0 ? -point : Math.abs(point)
          const isTimeDouble =
            d === MatchHandicapType.FULL_TIME_DOUBLE ||
            d === MatchHandicapType.HALF_TIME_DOUBLE ||
            d === MatchHandicapType.FULL_TIME_OVER_UNDER

          return (
            // eslint-disable-next-line react/jsx-key
            <View
              sx={{
                flexDirection: 'row',
                flex: isTimeDouble ? 0.6 : 1.1,
                justifyContent: 'center',
                py: 0,
                borderLeftWidth: 0.5,
                borderColor: 'rgba(255,255,255,0.6)',
              }}
            >
              <DataTableCell
                sx={{
                  flex: isTimeDouble ? 0.5 : 1,
                  px: 0,
                  py: '$0',
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
                    py: '$0',
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
                  sx={{ flex: 1, px: 0, py: '$0' }}
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
                  py: '$0',
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
      <DataTableCell
        sx={{
          flex: 0.15,
          py: '$0',
          borderLeftWidth: 0.25,
          borderColor: 'rgba(255,255,255,0.6)',
        }}
      >
        {/* {selectionType === 'away' && onPress && isLoggedIn ? (
          <Button
            contentProps={{ sx: { py: '$1', px: '$2' } }}
            titleProps={{ sx: { fontSize: [12, 12, 12, 12, 14] } }}
            onPress={() => onPress(item)}
          >
            {t('game.betNow')}
          </Button>
        ) : (
          ''
        )} */}
      </DataTableCell>
    </DataTableRow>
  )
}

const getBetColor = (val: number) => {
  return val === 0 ? 'white' : val < 0 ? '#ff8080' : '#99ff86'
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

interface GetSelectionId {
  selectionType: string
  d: MatchHandicapType
  item: MatchResult
}

const getSelectionId = ({ selectionType, item, d }: GetSelectionId) => {
  if (item.selection[d]?.length === 3) {
    return selectionType === 'home' ? 0 : selectionType === 'away' ? 2 : 1
  } else {
    return selectionType === 'home' ? 0 : 1
  }
}

export default MatchListTable
