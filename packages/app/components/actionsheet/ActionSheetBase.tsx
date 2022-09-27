import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React, { ComponentProps, ReactNode, useRef } from 'react'
import { Platform } from 'react-native'
import ActionSheet, { SheetProps } from 'react-native-actions-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import IconButton from '../form/IconButton'
import { DripsyGradient } from '../Gradient'
import HistoryEmpty from '../history/HistoryEmpty'

const DEFAULT_ACTION_SHEET_ID = 'defaultActionSheet'

type ActionSheetProps = Omit<ComponentProps<typeof ActionSheet>, 'children'> &
  SheetProps

export type ActionSheetBaseProps = {
  headerTitle: string
  actions?: HeaderActionsProps[]
  children?: ReactNode
} & ActionSheetProps

export type HeaderActionsProps = {
  icon: string
  onPress: () => void
}

const ActionSheetBase = ({
  sheetId,
  headerTitle,
  actions,
  children,
  ...rest
}: ActionSheetBaseProps) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const { height } = useContainerDimension()
  const actionSheetRef = useRef()

  const HeaderComponent = (
    <StyledViewHeader gradient="secondary">
      <StyledViewCenter>
        <Text
          sx={{
            fontWeight: 'bold',
            fontSize: 22,
          }}
          numberOfLines={1}
        >
          {t(headerTitle)}
        </Text>
      </StyledViewCenter>

      {actions && (
        <View sx={{ flexDirection: 'row', mx: '$2' }}>
          {actions.map((action: HeaderActionsProps) => (
            <IconButton
              key={action.icon}
              name={action.icon}
              onPress={() => action.onPress()}
            />
          ))}
        </View>
      )}
    </StyledViewHeader>
  )

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      gestureEnabled={Platform.OS === 'web' ? false : true}
      CustomHeaderComponent={HeaderComponent}
      headerAlwaysVisible={true}
      containerStyle={{
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        maxWidth: theme.sizes.container,
      }}
      {...rest}
    >
      <View
        sx={{
          backgroundColor: 'white',
          // minHeight: 100,
          maxHeight: height / 2 + 48,
        }}
      >
        <ScrollView
          nestedScrollEnabled={true}
          onMomentumScrollEnd={() =>
            actionSheetRef.current?.handleChildScrollEnd()
          }
          contentContainerStyle={
            {
              // paddingBottom: getBottomSpace(),
              // height: '100%',
            }
          }
        >
          {children ?? <HistoryEmpty sx={{ my: '$4' }} />}
        </ScrollView>
      </View>
    </ActionSheet>
  )
}

const StyledViewHeader = styled(DripsyGradient)({
  minHeight: 48,
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexDirection: 'row',
})

const StyledViewCenter = styled(View)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center',
})

export default ActionSheetBase
