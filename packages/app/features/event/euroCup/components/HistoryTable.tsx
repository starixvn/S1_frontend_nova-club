import useLocalization from 'app/provider/localization'
import { Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'

type ItemRowProps = {
  isHeader?: boolean
  item: ItemProps
}

type ItemProps = {
  no: number | string
  date: string
  status: string
}

const HistoryItem = [
  {
    no: 1,
    date: '26-06-2024',
    status:
      'Congratulations! You have collected X tickets to the Euro 2024 Prediction - Final Match.',
  },
  {
    no: 2,
    date: '13-06-2024',
    status: '“You have selected: Team 1, Team 2 … and Team 16”',
  },
]

const HistoryTable = () => {
  const { t } = useLocalization()
  const contentWidth = useResponsiveValue(['100%', 550, 700, 700, 800])

  return (
    <View
      sx={{
        width: contentWidth,
        borderRadius: 12,
        overflow: 'hidden',
        my: '$3',
      }}
    >
      <HeaderRow
        item={{
          no: t('common.no'),
          date: t('common.date'),
          status: t('deposit.status'),
        }}
      />
      {HistoryItem.map((item) => (
        <ItemRow key={item.no} item={item} />
      ))}
    </View>
  )
}

const HeaderRow = ({ isHeader = false, item }: ItemRowProps) => {
  return (
    <View>
      <Row sx={{ bg: '#00E600' }}>
        <HeaderText sx={{ flexBasis: 48, textAlign: 'center' }}>
          {item.no}
        </HeaderText>
        <HeaderText
          sx={{
            flex: 0.3,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'white',
            textAlign: 'center',
          }}
        >
          {item.date}
        </HeaderText>
        <HeaderText sx={{ flex: 1, px: '$4' }}>{item.status}</HeaderText>
      </Row>
    </View>
  )
}

const ItemRow = ({ item }: ItemRowProps) => {
  return (
    <View>
      <View sx={{ width: '100%', height: 1, bg: 'white' }} />
      <Row sx={{ bg: '#00000080' }}>
        <TableText sx={{ flexBasis: 48, textAlign: 'center' }}>
          {item.no}
        </TableText>
        <TableText
          sx={{
            flex: 0.3,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'white',
            textAlign: 'center',
          }}
        >
          {item.date}
        </TableText>
        <TableText sx={{ flex: 1, px: '$4' }}>{item.status}</TableText>
      </Row>
    </View>
  )
}

const TableText = styled(Text)({ py: '$2', px: '$1', fontSize: 14 })
const HeaderText = styled(TableText)({ color: 'black', fontWeight: 'bold' })

export default HistoryTable
