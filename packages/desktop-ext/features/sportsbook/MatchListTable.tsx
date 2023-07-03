import { View } from 'dripsy'
import React from 'react'
import { ScrollView } from 'dripsy'
import { League, MatchResult } from 'services/matchApi.type'
import DataTableRow from 'app/components/dataTable/DataTableRow'
import DataTableCell from 'app/components/dataTable/DataTableCell'
import { FlashList } from '@shopify/flash-list'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjsTz from 'app/utils/dayjs'
import dayjs from 'dayjs'
import { CONTENT_URI, MEDIA_DOMAIN } from '../../../../apps/next/config/env'
import { SolitoImage } from 'solito/image'
import { MatchHandicapType } from 'app/constants/recMatchMapping'
dayjs.extend(customParseFormat)

interface MatchListTableProps {
  data?: League
}

interface MatchListCellData {
  item: MatchResult
  selectionType: string
  flag: string
  dateTime: string
  name: string
}

const handicapTypeArr = [
  MatchHandicapType.FULL_TIME,
  MatchHandicapType.FULL_TIME_OVER,
  MatchHandicapType.FULL_TIME_DOUBLE,
  MatchHandicapType.HALF_TIME,
  MatchHandicapType.HALF_TIME_OVER,
  MatchHandicapType.HALF_TIME_DOUBLE,
]

const MatchListTable = ({ data }: MatchListTableProps) => {
  const onRender = ({ item, index }: { item: MatchResult; index: number }) => {
    const homeFlag = getFlagPath(item.HomeName)
    const awayFlag = getFlagPath(item.AwayName)

    let time = '-'
    let date = '-'
    try {
      const gmt8 = dayjs(item.globalshowtime, 'MM/DD hh:mmA')
      const gmt7 = dayjsTz(gmt8)

      if (gmt7.isValid()) {
        time = gmt7.format('HH:mm')
        date = gmt7.format('DD/MM')
      }
    } catch (e) {
      // Android Hermes will hit error if using dayjsTz
    }
    return (
      <View sx={{ py: '$2' }}>
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
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerSx={{
        overflow: 'visible',
        borderWidth: 1,
        borderColor: '$primary.100',
        mb: '$sectionBottomSpace',
        minHeight: 400,
      }}
    >
      <FlashList data={data} renderItem={onRender} estimatedItemSize={40} />
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
      <DataTableCell containerStyle={{ flex: 0.1 }}>{dateTime}</DataTableCell>
      <DataTableCell containerStyle={{ flex: 0.05 }}>
        <SolitoImage
          src={flag}
          alt="away"
          width={30}
          height={30}
          resizeMode="contain"
        />
      </DataTableCell>
      <DataTableCell
        textStyle={{ textAlign: 'center' }}
        containerStyle={{ maxWidth: 100, ml: '$2' }}
      >
        {name}
      </DataTableCell>
      <DataTableCell>
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
            <>
              {!isTimeDouble && (
                <DataTableCell
                  textStyle={{ color: getBetColor(point), maxWidth: 40 }}
                >
                  {point}
                </DataTableCell>
              )}

              <DataTableCell
                textStyle={{
                  color: isTimeDouble ? '#ffcc00' : 'white',
                  maxWidth: 40,
                }}
              >
                {price}
              </DataTableCell>
              {!isTimeDouble && (
                <DataTableCell
                  textStyle={{
                    color: getBetColor(invertedPoint),
                    maxWidth: 40,
                  }}
                >
                  {invertedPoint}
                </DataTableCell>
              )}
            </>
          )
        })}
      </DataTableCell>
    </DataTableRow>
  )
}

const getBetColor = (val: number) => {
  return val === 0 ? 'white' : val < 0 ? '#ff8080' : '#99ff86'
}

const getFlagPath = (country: string) => {
  const cleanFileName = country.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')

  return `${MEDIA_DOMAIN}${CONTENT_URI}/flags/${cleanFileName}.png`
}
export default MatchListTable
