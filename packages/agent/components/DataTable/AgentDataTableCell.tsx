import DataTable from 'app/components/dataTable/DataTable'
import { SxProp } from 'dripsy'
import React, { ComponentProps, ReactNode } from 'react'

type CellProps = ComponentProps<typeof DataTable.Cell>

type Props = {
  sx?: SxProp
  children: ReactNode
} & CellProps

const AgentDataTableCell = ({ sx, children, ...rest }: Props) => {
  return (
    <DataTable.Cell
      sx={{
        color: 'black',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </DataTable.Cell>
  )
}

export default AgentDataTableCell
