import Text from 'agent/components/Text'
import { styled, SxProp, View } from 'dripsy'
import * as React from 'react'
import { StyleSheet } from 'react-native'

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Text content of the `DataTableTitle`.
   */
  children: React.ReactNode
  /**
   * The number of lines to show.
   */
  numberOfLines?: number
  bordered?: boolean
  center?: boolean
  containerStyle?: SxProp
  /**
   * Text content style of the `DataTableTitle`.
   */
  textStyle?: SxProp
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

const DataTableTitle = ({
  children,
  bordered = false,
  center = false,
  textStyle,
  containerStyle,
  numberOfLines = 1,
  ...rest
}: Props) => {
  return (
    <TitleView
      center={center}
      bordered={bordered}
      sx={containerStyle}
      {...rest}
    >
      <ContentText
        sx={{
          // height must scale with numberOfLines
          maxHeight: 24 * numberOfLines,
          ...textStyle,
        }}
        numberOfLines={numberOfLines}
      >
        {children}
      </ContentText>
    </TitleView>
  )
}

DataTableTitle.displayName = 'DataTable.Title'

const TitleView = styled(View)(
  ({ center, bordered }: { center: boolean; bordered: boolean }) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: center ? 'center' : 'flex-start',
    borderRightWidth: bordered ? StyleSheet.hairlineWidth : 0,
    borderColor: '#AEAFAF',
    px: '$2',
  })
)

const ContentText = styled(Text)({
  lineHeight: 24,
  fontSize: 12,
  fontWeight: 'bold',
  alignItems: 'center',
  color: 'black',
})

export default DataTableTitle

// @component-docs ignore-next-line
export { DataTableTitle }
