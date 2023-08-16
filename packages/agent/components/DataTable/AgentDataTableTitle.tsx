import DataTable from 'app/components/dataTable/DataTable'
import { SxProp } from 'dripsy'
import React, { ComponentProps, ReactNode } from 'react'

type TitleProps = ComponentProps<typeof DataTable.Title>

type Props = {
  sx?: SxProp
  textStyle?: SxProp
  children: ReactNode
} & TitleProps

const AgentDataTableTitle = ({ textStyle, children, ...rest }: Props) => {
  return (
    <DataTable.Title textStyle={{ color: 'black', ...textStyle }} {...rest}>
      {children}
    </DataTable.Title>
  )
}

export default AgentDataTableTitle
