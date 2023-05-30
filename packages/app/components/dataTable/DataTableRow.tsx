import { styled, SxProp, View } from 'dripsy'
import * as React from 'react'
import { StyleSheet, ViewProps } from 'react-native'
import { $RemoveChildren } from './types'

export type Props = $RemoveChildren<typeof View> & {
  /**
   * Content of the `DataTableRow`.
   */
  children: React.ReactNode
  /**
   * Function to execute on press.
   */
  size?: 'big' | 'small'
  containerStyle?: SxProp
  /**
   * @optional
   */
  /**
   * `pointerEvents` passed to the `View` container, which is wrapping children within `TouchableRipple`.
   */
  pointerEvents?: ViewProps['pointerEvents']
}

/**
 * A component to show a single row inside of a table.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/data-table-row-cell.png" />
 *   </figure>
 * </div>
 *
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { DataTable } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *      <DataTable.Row>
 *        <DataTable.Cell numeric>1</DataTable.Cell>
 *        <DataTable.Cell numeric>2</DataTable.Cell>
 *        <DataTable.Cell numeric>3</DataTable.Cell>
 *        <DataTable.Cell numeric>4</DataTable.Cell>
 *      </DataTable.Row>
 * );
 *
 * export default MyComponent;
 * ```
 */

const DataTableRow = ({
  size = 'small',
  containerStyle,
  children,
  pointerEvents,
  ...rest
}: Props) => {
  return (
    <RowView size={size} sx={containerStyle} {...rest}>
      <ContentView pointerEvents={pointerEvents}>{children}</ContentView>
    </RowView>
  )
}

DataTableRow.displayName = 'DataTable.Row'

const RowView = styled(View)(({ size }: { size: 'big' | 'small' }) => ({
  borderStyle: 'solid',
  minHeight: size === 'small' ? 36 : 48,
}))

const ContentView = styled(View)({
  flex: 1,
  flexDirection: 'row',
})

export default DataTableRow

// @component-docs ignore-next-line
export { DataTableRow }
