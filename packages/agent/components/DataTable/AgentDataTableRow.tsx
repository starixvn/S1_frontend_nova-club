import DataTable from 'app/components/dataTable/DataTable'
import { SxProp } from 'dripsy'
import React, { ComponentProps, ReactNode } from 'react'
import { StyleSheet } from 'react-native'

type RowProps = ComponentProps<typeof DataTable.Row>

type AgentDataTableRowProps = {
  sx?: SxProp
  children: ReactNode
} & RowProps

const AgentDataTableRow = ({
  sx,
  children,
  ...rest
}: AgentDataTableRowProps) => {
  return (
    <DataTable.Row
      sx={{
        borderStyle: 'solid',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '$tableBorder',
        bg: 'white',
        // borderBottomWidth: 1,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </DataTable.Row>
  )
}

export default AgentDataTableRow
