import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from '@tanstack/react-table'
import { LANGUAGE_CODE } from 'app/constant/language'
import useLocalization, { Translate } from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { SettingActions } from 'app/store/setting.slice'
import { Currency } from 'app/utils/constant'
import { ActivityIndicator, useDripsyTheme } from 'dripsy'
import React, { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'
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
  | 'game_type'
  | 'seq'
>

const enum TABLE_COLUMN {
  SYSTEM_NAME = 'system_name',
  CASH_PLAYER = 'cash_player',
  PLAYER_REFERRAL = 'cash_player_referrer',
  CREDIT_PLAYER = 'credit_player',
}

const EXCLUDE_MASTER_NAME = 'MASTER'

const table = createTable().setRowType<Commission>()

const convertNegativeValue = (value?: number) => {
  if ((value && value < 0) || typeof value === 'undefined') return '-'

  return `${value}%`
}

const generateTableColumns = (t: Translate) => {
  return [
    table.createDataColumn(TABLE_COLUMN.SYSTEM_NAME, {
      header: t('commission.productLists'),
      cell: (props) => {
        const { system_name = '', game_type = '' } = props.row.original || {}

        return system_name ? system_name : game_type
      },
    }),
    table.createDataColumn(TABLE_COLUMN.CASH_PLAYER, {
      header: t('commission.cashPlayer'),
      cell: (props) => {
        return convertNegativeValue(props.row.original?.cash_player)
      },
    }),
    table.createDataColumn(TABLE_COLUMN.PLAYER_REFERRAL, {
      header: t('commission.cashPlayerReferral'),
      cell: (props) => {
        return convertNegativeValue(props.row.original?.cash_player_referrer)
      },
    }),
    table.createDataColumn(TABLE_COLUMN.CREDIT_PLAYER, {
      header: t('commission.creditPlayer'),
      cell: (props) => {
        return convertNegativeValue(props.row.original?.credit_player)
      },
    }),
  ]
}

const SimpleTable = () => {
  const dispatch = useAppDispatch()
  const { t } = useLocalization()
  const [columns, setColumns] = useState<
    ReturnType<typeof generateTableColumns>
  >(generateTableColumns(t))

  const { theme } = useDripsyTheme()

  const { data, isLoading } = useCommissionTableQuery({
    // WIP: Currency should not be hardcoded
    currency: Currency.VND,
  })

  const tableList = [...(data?.data || [])]
  const excludeMasterList = tableList.filter(
    (list) => list.system_code !== EXCLUDE_MASTER_NAME
  )
  const sortedTableList = excludeMasterList.sort((a, b) => {
    if (a.seq < b.seq) {
      return -1
    }
    if (a.seq > b.seq) {
      return 1
    }
    return 0
  })

  const isCategoryAndFirstCol = (row, cell) => {
    return (
      (row.original?.is_game_type || row.original?.is_master) &&
      cell.column.id === TABLE_COLUMN.SYSTEM_NAME
    )
  }

  const tableInstance = useTableInstance(table, {
    data: sortedTableList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const getUrlQueryLang = useCallback(() => {
    const url = new URLSearchParams(window.location.search)
    const urlLang = url.get('lang')

    if (
      urlLang &&
      Object.values(LANGUAGE_CODE).includes(urlLang as LANGUAGE_CODE)
    ) {
      dispatch(SettingActions.setLocale(urlLang))
    }
  }, [dispatch])

  useEffect(() => {
    if (Platform.OS === 'web' && window.ReactNativeWebView != null) {
      getUrlQueryLang()
      setColumns(generateTableColumns(t))
    }
  }, [getUrlQueryLang, t])

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
            {headerGroup.headers.map((header, index) => (
              <th
                key={index}
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
            {row.getVisibleCells().map((cell, index) => {
              if (
                row.original?.is_game_type &&
                cell.column.id !== TABLE_COLUMN.SYSTEM_NAME
              ) {
                return null
              }

              return (
                <td
                  key={index}
                  style={{
                    borderColor: theme.colors.$lightNavyBlue,
                    paddingLeft: isCategoryAndFirstCol(row, cell) ? 7 : 16,
                    fontWeight: isCategoryAndFirstCol(row, cell)
                      ? 'bold'
                      : 'normal',
                    backgroundColor: row.original?.is_game_type
                      ? '#224972'
                      : '',
                  }}
                  colSpan={
                    row.original?.is_game_type ? columns.length : undefined
                  }
                >
                  {cell.renderCell()}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SimpleTable
