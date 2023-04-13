import { styled, SxProp, View } from 'dripsy'
import * as React from 'react'
import { GestureResponderEvent, StyleSheet } from 'react-native'
import Text from 'agent/components/Text'
import { $RemoveChildren } from './types'

export type Props = $RemoveChildren<typeof View> & {
  /**
   * Content of the `DataTableCell`.
   */
  children: React.ReactNode
  /**
   * Align the text to the right. Generally monetary or number fields are aligned to right.
   */
  center?: boolean
  bordered?: boolean
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void
  containerStyle?: SxProp
  /**
   * Text content style of the `DataTableCell`.
   */
  textStyle?: SxProp
}

/**
 * A component to show a single cell inside of a table.
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
 *
 * If you want to support multiline text, please use View instead, as multiline text doesn't comply with
 * MD Guidelines (https://github.com/callstack/react-native-paper/issues/2381).
 */

const DataTableCell = ({
  children,
  textStyle,
  containerStyle = {},
  bordered = false,
  center = false,
  ...rest
}: Props) => {
  return (
    <CellView center={center} bordered={bordered} {...rest} sx={containerStyle}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text sx={{ ...textStyle }} numberOfLines={2}>
          {children}
        </Text>
      ) : (
        children
      )}
    </CellView>
  )
}

export const DateTimeField = ({
  date,
  time,
}: {
  date: string
  time?: string
}) => (
  <View sx={{ flexDirection: 'column' }}>
    <Text sx={{ color: 'black', textAlign: 'center', fontSize: 14 }}>
      {date}
    </Text>
    {time && (
      <Text
        sx={{
          color: '$taupeGray',
          textAlign: 'center',
          fontSize: 13,
          lineHeight: 14,
        }}
      >
        {time}
      </Text>
    )}
  </View>
)

DataTableCell.displayName = 'DataTable.Cell'

const CellView = styled(View)(
  ({ center, bordered }: { center: boolean; bordered: boolean }) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: center ? 'center' : 'flex-start',
    borderRightWidth: bordered ? StyleSheet.hairlineWidth : 0,
    borderColor: '#AEAFAF',
    px: '$2',
    py: '$1',
  })
)

export default DataTableCell
