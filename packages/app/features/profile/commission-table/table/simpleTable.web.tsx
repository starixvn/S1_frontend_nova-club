import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from '@tanstack/react-table'
import { useCommissionTableQuery } from 'app/services/contentApi'
import { CommissionTableResult } from 'app/services/contentApi.type'
import { Currency, currencyListMapper } from 'app/utils/constant'
import { ActivityIndicator, useDripsyTheme } from 'dripsy'
import React, { useRef, useState } from 'react'
import styles from './simpleTable.module.css'

type Commission = Pick<
  CommissionTableResult,
  | 'system_name'
  | 'game_type'
  | 'cash_player'
  | 'cash_player_referrer'
  | 'credit_player'
>

const table = createTable().setRowType<Commission>()

const tableColumns = [
  table.createDataColumn('system_name', {
    header: 'Products List',
    cell: (props) => {
      return `${props.row.original?.system_name} ${props.row.original?.game_type}`
    },
  }),
  table.createDataColumn('cash_player', {
    header: 'Cash Player',
  }),
  table.createDataColumn('cash_player_referrer', {
    header: 'Cash Player Referral',
  }),
  table.createDataColumn('credit_player', {
    header: 'Credit player',
  }),
]

const SimpleTable = () => {
  const [columns] = useState<typeof tableColumns>(() => [...tableColumns])

  const { theme } = useDripsyTheme()

  const { data, isLoading } = useCommissionTableQuery({
    currency: currencyListMapper[Currency.VND]!,
  })

  const tableInstance = useTableInstance(table, {
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return <ActivityIndicator size={'small'} sx={{ mt: '$3' }} />
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
