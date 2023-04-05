import RefreshButton from 'agent/components/Icon/RefreshButton'
import Text from 'agent/components/Text'
import { styled, SxProp, useDripsyTheme, View } from 'dripsy'
import React, { ComponentProps } from 'react'

const StyleText = styled(Text)({ color: 'white' })

type DataTableRefreshProps = {
  title: string
  center?: boolean
  isLoading?: boolean
  onRefresh?: () => void
  containerStyle?: SxProp
  titleProps?: ComponentProps<typeof StyleText>
}
const DataTableRefresh = ({
  title,
  titleProps,
  center = false,
  isLoading,
  onRefresh,
  containerStyle,
}: DataTableRefreshProps) => {
  const { theme } = useDripsyTheme()

  return (
    <View
      sx={{
        bg: theme.colors.$primaryAgent,
        justifyContent: 'center',
        minHeight: 36,
        py: 8,
        pl: 12,
        pr: center ? 0 : 24,
        alignItems: center ? 'center' : 'flex-start',
        ...containerStyle,
      }}
    >
      <StyleText {...titleProps}>{title}</StyleText>
      {onRefresh ? (
        <View sx={{ position: 'absolute', right: 12 }}>
          <RefreshButton loading={isLoading} onPress={onRefresh} />
        </View>
      ) : null}
    </View>
  )
}

export default DataTableRefresh
