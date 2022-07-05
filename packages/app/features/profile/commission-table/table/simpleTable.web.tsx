import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from '@tanstack/react-table'
import useLocalization, { Translate } from 'app/provider/localization'
import { useCommissionTableQuery } from 'services/contentApi'
import { CommissionTableResult } from 'services/contentApi.type'
import { Currency, currencyListMapper } from 'app/utils/constant'
import { ActivityIndicator, useDripsyTheme } from 'dripsy'
import React, { useState } from 'react'
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

const generateTableColumns = (t: Translate) => {
  return [
    table.createDataColumn('system_name', {
      header: t('commission.productLists'),
      cell: (props) => {
        const { system_name = '', game_type = '' } = props.row.original || {}
        return `${system_name} ${game_type}`
      },
    }),
    table.createDataColumn('cash_player', {
      header: t('commission.cashPlayer'),
    }),
    table.createDataColumn('cash_player_referrer', {
      header: t('commission.cashPlayerReferral'),
    }),
    table.createDataColumn('credit_player', {
      header: t('commission.creditPlayer'),
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
