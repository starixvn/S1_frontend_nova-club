import { Row, styled, SxProp, View } from 'dripsy'
import * as React from 'react'
import { StyleSheet } from 'react-native'

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `DataTableHeader`.
   */
  size?: 'big' | 'small'
  children: React.ReactNode
}

const DataTableHeader = ({ children, ...rest }: Props) => {
  return (
    <HeaderView {...rest}>
      <Row>{children}</Row>
    </HeaderView>
  )
}

DataTableHeader.displayName = 'DataTable.Header'

const HeaderView = styled(View)(() => ({
  // flexDirection: 'row',
  // alignItems: 'center',
  // minHeight: size === 'small' ? 48 : 60,
  py: ['$2', '$2', '$2', '$2', '$3'],
  bg: '$primary.300',
}))

export default DataTableHeader

// @component-docs ignore-next-line
export { DataTableHeader }
