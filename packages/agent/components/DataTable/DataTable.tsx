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
  style?: SxProp
}

/**
 * Data tables allow displaying sets of data.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="large" src="screenshots/data-table.png" />
 *     <figcaption>Data table</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DataTable } from 'react-native-paper';
 *
 * const optionsPerPage = [2, 3, 4];
 *
 * const MyComponent = () => {
 *   const [page, setPage] = React.useState<number>(0);
 *   const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
 *
 *   React.useEffect(() => {
 *     setPage(0);
 *   }, [itemsPerPage]);
 *
 *   return (
 *     <DataTable>
 *       <DataTable.Header>
 *         <DataTable.Title>Dessert</DataTable.Title>
 *         <DataTable.Title numeric>Calories</DataTable.Title>
 *         <DataTable.Title numeric>Fat</DataTable.Title>
 *       </DataTable.Header>
 *
 *       <DataTable.Row>
 *         <DataTable.Cell>Frozen yogurt</DataTable.Cell>
 *         <DataTable.Cell numeric>159</DataTable.Cell>
 *         <DataTable.Cell numeric>6.0</DataTable.Cell>
 *       </DataTable.Row>
 *
 *       <DataTable.Row>
 *         <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
 *         <DataTable.Cell numeric>237</DataTable.Cell>
 *         <DataTable.Cell numeric>8.0</DataTable.Cell>
 *       </DataTable.Row>
 *
 *       <DataTable.Pagination
 *         page={page}
 *         numberOfPages={3}
 *         onPageChange={(page) => setPage(page)}
 *         label="1-2 of 6"
 *         optionsPerPage={optionsPerPage}
 *         itemsPerPage={itemsPerPage}
 *         setItemsPerPage={setItemsPerPage}
 *         showFastPagination
 *         optionsLabel={'Rows per page'}
 *       />
 *     </DataTable>
 *   );
 *}
 *
 * export default MyComponent;
 * ```
 */
const DataTable = ({ rounded = false, children, style, ...rest }: Props) => (
  <RootView rounded={rounded} sx={style} {...rest}>
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
  backgroundColor: 'white',
  overflow: 'hidden',
  borderRadius: rounded ? 24 : 0,
}))

export default DataTable
