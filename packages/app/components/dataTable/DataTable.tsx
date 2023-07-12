import { styled, SxProp, View } from 'dripsy'
import * as React from 'react'

import DataTableCell from './DataTableCell'
import DataTableHeader from './DataTableHeader'
import DataTablePagination from './DataTablePagination'
import DataTableRow from './DataTableRow'
import DataTableTitle from './DataTableTitle'

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `DataTable`.
   */
  rounded?: boolean
  children: React.ReactNode
}

const DataTable = ({ rounded = false, children, ...rest }: Props) => (
  <RootView rounded={rounded} {...rest}>
    {children}
  </RootView>
)

// @component ./DataTableHeader.tsx
DataTable.Header = DataTableHeader

// @component ./DataTableTitle.tsx
DataTable.Title = DataTableTitle

// @component ./DataTableRow.tsx
DataTable.Row = DataTableRow

// @component ./DataTableCell.tsx
DataTable.Cell = DataTableCell

// @component ./DataTablePagination.tsx
DataTable.Pagination = DataTablePagination

const RootView = styled(View)(({ rounded }: { rounded: boolean }) => ({
  width: '100%',
  backgroundColor: '$background',
  overflow: 'hidden',
  borderRadius: rounded ? 24 : 0,
}))

export default DataTable
