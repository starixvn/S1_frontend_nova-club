import { EntityId } from '@reduxjs/toolkit'
import { FlashList } from '@shopify/flash-list'
import Button from 'app/components/common/Button'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import { SabaGamePayload } from 'app/constants/game'
import { MatchHandicapType } from 'app/constants/recMatchMapping'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Pressable, View } from 'dripsy'
import keyBy from 'lodash/keyBy'
import { MotiView } from 'moti'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useInView } from 'react-intersection-observer'
import { Game } from 'services/gameApi.type'
import { MatchResult } from 'services/matchApi.type'
import { SolitoImage } from 'solito/image'
import { MEDIA_DOMAIN } from '../../../../apps/next/config/env'
import MatchListHeader from './MatchListHeader'
import { logEvent } from 'app/integrations/analytic'
import { GAEvents } from 'app/integrations/analytic/events'
dayjs.extend(customParseFormat)

interface MatchListTableProps {
  data: (EntityId | MatchResult)[]
  filterKey: string
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

export interface MatchListMethod {
  jumpTo: (index: number) => void
}

const ROW_HEIGHT = 143

const MatchListTable = forwardRef<MatchListMethod, MatchListTableProps>(
  ({ data, filterKey }: MatchListTableProps, ref) => {
    const leagueTabs = keyBy(data, 'LeagueId')

    const isDesktop = useIsDesktop()
    const flashListRef = useRef()

    const onPress = (match: MatchResult) => {
      logEvent(GAEvents.CTA_OddsBetNow, {
        ref: match.EventId.toString(),
        display_name: `${match.HomeName} vs ${match.AwayName}`,
      })

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

    const [stickyIndices, setStickyIndices] = useState<number[]>([])

    useEffect(() => {
      setStickyIndices([])
      setTimeout(() =>
        setStickyIndices(
          data
            .map((item, index) => (typeof item === 'string' ? index : -1))
            .filter((index) => index > -1)
        )
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterKey])

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
          // style={{ height: 500 }}
          ref={flashListRef}
          data={data}
          estimatedItemSize={143}
          keyExtractor={(item) =>
            typeof item === 'string' || typeof item === 'number'
              ? item.toString()
              : item?.EventId.toString()
          }
          stickyHeaderIndices={stickyIndices}
          extraData={data}
          getItemType={(item) => {
            // To achieve better performance, specify the type based on the item
            return typeof item === 'string' || typeof item === 'number'
              ? 'sectionHeader'
              : 'row'
          }}
          renderItem={({ index, item }) => {
            if (typeof item === 'string' || typeof item === 'number') {
              // Rendering header
              // const sample = data.find(
              //   (m) => typeof m === 'object' && m.LeagueId.toString() === item
              // )
              const sample = leagueTabs[item]

              return <MatchListHeader data={sample} height={50} />
            } else {
              // Render item
              const homeFlag = `${MEDIA_DOMAIN}/nvclub${item.HomeImagePath}`
              const awayFlag = `${MEDIA_DOMAIN}/nvclub${item.AwayImagePath}`
              const { date, matchUnixDate, time, matchDayjs } = getMatchTime(
                item.globalshowtime
              )

              return (
                <MatchListCellRow
                  awayFlag={awayFlag}
                  date={date}
                  homeFlag={homeFlag}
                  index={index}
                  item={item}
                  onPress={onPress}
                  time={time}
                />
              )
            }
          }}
        />
      </View>
    )
  }
)

const MatchListCellRow = ({
  index,
  time,
  date,
  homeFlag,
  awayFlag,
  item,
  onPress,
}: MatchListCellRowProps) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  })

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
  const { t } = useLocalization()
  const isLoggedIn = useAppSelector((state) => state.auth.info?.token)

  return (
    <DataTableRow key={dateTime} sx={{ height: 45 }}>
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

          const isHideInverted =
            d === MatchHandicapType.FULL_TIME_OVER ||
            d === MatchHandicapType.HALF_TIME_OVER

          return (
            // eslint-disable-next-line react/jsx-key
            <Pressable
              onPress={() => {
                logEvent(GAEvents.CTA_Odds, {
                  ref: item.EventId.toString(),
                  display_name: getGALogName(d),
                })
              }}
              key={`${i} + ${item.EventId}`}
              sx={{
                flexDirection: 'row',
                flex: isTimeDouble ? 0.6 : isHideInverted ? 0.8 : 1.1,
                justifyContent: 'center',
                py: 0,
                borderLeftWidth: 0.5,
                borderColor: 'rgba(255,255,255,0.6)',
                cursor: 'default',
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

              {!isHideInverted && (
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
              )}
            </Pressable>
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
        {selectionType === 'away' && onPress && isLoggedIn ? (
          <Button
            contentProps={{ sx: { py: '$1', px: '$2' } }}
            titleProps={{ sx: { fontSize: [12, 12, 12, 12, 14] } }}
            onPress={() => onPress(item)}
          >
            {t('game.betNow')}
          </Button>
        ) : (
          ''
        )}
      </DataTableCell>
    </DataTableRow>
  )
}

const getBetColor = (val: number) => {
  return val === 0 ? 'white' : val < 0 ? '#ff8080' : '#99ff86'
}

const getGALogName = (d: MatchHandicapType) => {
  switch (d) {
    case MatchHandicapType.FULL_TIME:
      return 'FT. HDP'
    case MatchHandicapType.FULL_TIME_OVER:
      return 'FT. O/U'
    case MatchHandicapType.FULL_TIME_DOUBLE:
      return 'FT. 1x2'
    case MatchHandicapType.FULL_TIME_OVER_UNDER:
      return 'FT. O/E'
    case MatchHandicapType.HALF_TIME:
      return '1H. HDP'
    case MatchHandicapType.HALF_TIME_OVER:
      return '1H. O/U'
    case MatchHandicapType.HALF_TIME_DOUBLE:
      return '1H. 1x2'
  }
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
