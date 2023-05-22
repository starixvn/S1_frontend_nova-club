import { styled, SxProp, View } from 'dripsy'
import * as React from 'react'
import { StyleSheet } from 'react-native'

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `DataTableHeader`.
   */
  size?: 'big' | 'small'
  children: React.ReactNode
  containerStyle?: SxProp
}

/**
 * A component to display title in table header.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/data-table-header.png" />
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
 *       <DataTable>
 *         <DataTable.Header>
 *           <DataTable.Title
 *             sortDirection='descending'
 *           >
 *             Dessert
 *           </DataTable.Title>
 *           <DataTable.Title numeric>Calories</DataTable.Title>
 *           <DataTable.Title numeric>Fat (g)</DataTable.Title>
 *         </DataTable.Header>
 *       </DataTable>
 * );
 *
 * export default MyComponent;
 * ```
 */

const DataTableHeader = ({
  size = 'small',
  children,
  containerStyle,
  ...rest
}: Props) => {
  return (
    <HeaderView sx={containerStyle} size={size} {...rest}>
      <ContentView>{children}</ContentView>
    </HeaderView>
  )
}

DataTableHeader.displayName = 'DataTable.Header'

const HeaderView = styled(View)(({ size }: { size: 'big' | 'small' }) => ({
  // flexDirection: 'row',
  // alignItems: 'center',
  height: size === 'small' ? 36 : 48,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: '#AEAFAF',
  backgroundColor: '#D1D1D1',
}))

const ContentView = styled(View)({
  flex: 1,
  flexDirection: 'row',
})

export default DataTableHeader

// @component-docs ignore-next-line
export { DataTableHeader }
