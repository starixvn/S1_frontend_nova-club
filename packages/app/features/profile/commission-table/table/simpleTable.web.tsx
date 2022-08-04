import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from '@tanstack/react-table'
import useLocalization, { Translate } from 'app/provider/localization'
import { Currency } from 'app/utils/constant'
import { ActivityIndicator, useDripsyTheme } from 'dripsy'
import React, { useState } from 'react'
import { useCommissionTableQuery } from 'services/contentApi'
import { CommissionTableResult } from 'services/contentApi.type'
import styles from './simpleTable.module.css'

type Commission = Pick<
  CommissionTableResult,
  | 'system_name'
  | 'cash_player'
  | 'cash_player_referrer'
  | 'credit_player'
  | 'game_type_code'
  | 'is_game_type'
  | 'is_master'
>

const table = createTable().setRowType<Commission>()

const convertNegativeValue = (value?: number) => {
  if ((value && value < 0) || typeof value === 'undefined') return '-'

  return `${value}%`
}

const generateTableColumns = (t: Translate) => {
  return [
    table.createDataColumn('system_name', {
      header: t('commission.productLists'),
      cell: (props) => {
        const { system_name = '', game_type_code = '' } =
          props.row.original || {}
        const gameTypeName = game_type_code.replace('_', ' ')

        return system_name ? system_name : gameTypeName
      },
    }),
    table.createDataColumn('cash_player', {
      header: t('commission.cashPlayer'),
      cell: (props) => {
        return convertNegativeValue(props.row.original?.cash_player)
      },
    }),
    table.createDataColumn('cash_player_referrer', {
      header: t('commission.cashPlayerReferral'),
      cell: (props) => {
        return convertNegativeValue(props.row.original?.cash_player_referrer)
      },
    }),
    table.createDataColumn('credit_player', {
      header: t('commission.creditPlayer'),
      cell: (props) => {
        return convertNegativeValue(props.row.original?.credit_player)
      },
    }),
  ]
}

const SimpleTable = () => {
  const { t } = useLocalization()
  const [columns] = useState<ReturnType<typeof generateTableColumns>>(
    generateTableColumns(t)
  )

  const { theme } = useDripsyTheme()

  const { data, isLoading } = useCommissionTableQuery({
    // WIP: Currency should not be hardcoded
    currency: Currency.VND,
  })

  const tableList = [...(data?.data || [])]
  const sortedTableList = tableList.sort((a, b) => {
    if (a.game_type_code < b.game_type_code) {
      return -1
    }
    if (a.game_type_code > b.game_type_code) {
      return 1
    }
    return 0
  })

  const isCategoryAndFirstCol = (row, cell) => {
    return (
      (row.original?.is_game_type || row.original?.is_master) &&
      cell.column.id === 'system_name'
    )
  }

  const tableInstance = useTableInstance(table, {
    data: sortedTableList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <ActivityIndicator
        size={'small'}
        sx={{ mt: '$3' }}
        color={'$lightCyan'}
      />
    )
  }

  return (
    <table
      className={styles['simple-table']}
      style={{
        color: theme.colors.$text,
        marginBottom: theme.space.$10,
      }}
    >
      <thead style={{ backgroundColor: theme.colors.$secondary }}>
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{
                  borderColor: theme.colors.$lightNavyBlue,
                }}
              >
                {header.isPlaceholder ? null : header.renderHeader()}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tableInstance.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  borderColor: theme.colors.$lightNavyBlue,
                  paddingLeft: isCategoryAndFirstCol(row, cell) ? 7 : 16,
                  fontWeight: isCategoryAndFirstCol(row, cell)
                    ? 'bold'
                    : 'normal',
                  backgroundColor:
                    row.original?.is_game_type || row.original?.is_master
                      ? '#224972'
                      : '',
                  textTransform: 'capitalize',
                }}
              >
                {cell.renderCell()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SimpleTable
