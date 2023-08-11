import useContainerDimension from 'app/hooks/useContainerDimension'
import { SxProp, useDripsyTheme, useSx, View } from 'dripsy'
import React, { ReactNode, useRef } from 'react'
import { Platform, ScrollView } from 'react-native'
import ActionSheetBase, {
  ActionSheetRef,
  ActionSheetProps as RNActionSheetProps,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet'

type ActionSheetBaseProps = Omit<
  RNActionSheetProps,
  'children' | 'containerStyle' | 'indicatorStyle'
> & {
  containerStyleSx?: SxProp
  indicatorStyleSx?: SxProp
}

export type ActionSheetProps = {
  actions?: HeaderActionsProps[]
  children?: ReactNode
  sheetId: SheetProps['sheetId']
} & ActionSheetBaseProps

export type HeaderActionsProps = {
  icon: string
  onPress: () => void
}

const ActionSheet = ({
  sheetId,
  actions,
  children,
  ...props
}: ActionSheetProps) => {
  const { theme } = useDripsyTheme()
  const { height } = useContainerDimension()
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const scrollHandlers = useScrollHandlers<ScrollView>(
    `scroll-${sheetId}`,
    actionSheetRef
  )
  const { containerStyleSx, indicatorStyleSx, ...rest } = props
  const sx = useSx()

  return (
    <ActionSheetBase
      id={sheetId}
      ref={actionSheetRef}
      gestureEnabled={Platform.OS === 'web' ? false : true}
      headerAlwaysVisible={true}
      containerStyle={sx({
        overflow: 'hidden',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        bg: 'transparent',
        maxWidth: theme.sizes.container,
        ...(containerStyleSx &&
          (typeof containerStyleSx === 'function'
            ? containerStyleSx(theme)
            : containerStyleSx)),
      })}
      indicatorStyle={sx({
        my: 10,
        ...(indicatorStyleSx &&
          (typeof indicatorStyleSx === 'function'
            ? indicatorStyleSx(theme)
            : indicatorStyleSx)),
      })}
      {...rest}
    >
      <View
        sx={{
          backgroundColor: 'white',
          maxHeight: height / 2 + 48,
        }}
      >
        <ScrollView {...scrollHandlers}>{children}</ScrollView>
      </View>
    </ActionSheetBase>
  )
}

export default ActionSheet
