import { View, Text, styled, useDripsyTheme, ActivityIndicator } from 'dripsy'
import React, { useRef, useState } from 'react'
import {
  createTable,
  getCoreRowModel,
  useTableInstance,
} from '@tanstack/react-table'
import styles from './simpleTable.module.css'
import { useDummyRtk } from 'utils/rtk'

interface Commission {
  productName: string
  cashPlayerComm: string
  cashPlayerReferralComm: string
  creditPlayerComm: string
}

const table = createTable().setRowType<Commission>()

const commData: Commission[] = [
  {
    productName: 'Saba Sports',
    cashPlayerComm: '0.5',
    cashPlayerReferralComm: '0.3',
    creditPlayerComm: '0.2',
  },
  {
    productName: 'BT Sports',
    cashPlayerComm: '0.4',
    cashPlayerReferralComm: '0.6',
    creditPlayerComm: '0.2',
  },
  {
    productName: 'SBO Sports',
    cashPlayerComm: '0.5',
    cashPlayerReferralComm: '0.8',
    creditPlayerComm: '0.2',
  },
]

const tableColumns = [
  table.createDataColumn('productName', {
    header: (props) => {
      console.log(props)
      return 'Products List'
    },
  }),
  table.createDataColumn('cashPlayerComm', {
    header: 'Cash Player',
  }),
  table.createDataColumn('cashPlayerReferralComm', {
    header: 'Cash Player Referral',
  }),
  table.createDataColumn('creditPlayerComm', {
    header: 'Credit player',
  }),
]

const SimpleTable = () => {
  const [data, setData] = useState(() => [...commData])
  // const [columns] = useState<typeof tableColumns>(() => [...tableColumns])
  const tableRef = useRef(null)

  const { theme } = useDripsyTheme()

  const { data: columns, isLoading } = useDummyRtk(tableColumns)

  const tableInstance = useTableInstance(table, {
    data,
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
