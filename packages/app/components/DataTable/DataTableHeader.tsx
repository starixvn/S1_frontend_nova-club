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
  minHeight: size === 'small' ? 48 : 60,
}))

const ContentView = styled(View)({
  flex: 1,
  flexDirection: 'row',
})

export default DataTableHeader

// @component-docs ignore-next-line
export { DataTableHeader }
