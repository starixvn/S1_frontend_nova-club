import { AGENT_URL } from '@env'
import RefreshButton from 'agent/components/Icon/RefreshButton'
import Text from 'agent/components/Text'
import { Pressable, styled, SxProp, useDripsyTheme, View } from 'dripsy'
import React, { ComponentProps } from 'react'
import { Linking } from 'react-native'

const StyleText = styled(Text)(({ isHyperlink }: { isHyperlink: boolean }) => ({
  color: 'white',
  textDecorationLine: isHyperlink ? 'underline' : null,
}))

type DataTableRefreshProps = {
  title: string
  center?: boolean
  isLoading?: boolean
  onRefresh?: () => void
  containerStyle?: SxProp
  titleProps?: ComponentProps<typeof StyleText>
  isHyperlink?: boolean
}
const DataTableRefresh = ({
  title,
  titleProps,
  center = false,
  isLoading,
  onRefresh,
  containerStyle,
  isHyperlink = false,
}: DataTableRefreshProps) => {
  const { theme } = useDripsyTheme()

  const handleDesktop = () => {
    Linking.openURL(AGENT_URL)
  }

  return (
    <View
      sx={{
        bg: theme.colors.$primaryAgent,
        justifyContent: 'center',
        minHeight: 36,
        py: 8,
        pl: 12,
        pr: center ? 0 : 30,
        alignItems: center ? 'center' : 'flex-start',
        ...containerStyle,
      }}
    >
      <Pressable onPress={handleDesktop} disabled={!isHyperlink}>
        <StyleText isHyperlink={isHyperlink} {...titleProps}>
          {title}
        </StyleText>
      </Pressable>
      {onRefresh ? (
        <View sx={{ position: 'absolute', right: 12 }}>
          <RefreshButton loading={isLoading} onPress={onRefresh} />
        </View>
      ) : null}
    </View>
  )
}

export default DataTableRefresh
