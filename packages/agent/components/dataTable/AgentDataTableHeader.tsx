import DataTable from 'app/components/dataTable/DataTable'
import { SxProp } from 'dripsy'
import React, { ReactNode } from 'react'

type AgentDataTableHeaderProps = {
  sx?: SxProp
  children: ReactNode
}

const AgentDataTableHeader = ({ sx, children }: AgentDataTableHeaderProps) => {
  return (
    <DataTable.Header
      sx={{
        borderBottomColor: '$tableBorder',
        backgroundColor: '$tableHeader',
        borderBottomWidth: 1,
        ...sx,
      }}
    >
      {children}
    </DataTable.Header>
  )
}

export default AgentDataTableHeader
