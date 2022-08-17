import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { View } from 'dripsy'
import React, { ComponentProps } from 'react'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import ActionSheetBase, {
  ActionSheetBaseProps,
  HeaderActionsProps,
} from './ActionSheetBase'
import ActionSheetItem, { ActionSheetItemProps } from './ActionSheetItem'

type SheetDataProps = {
  label: string
  value: string
  icon: string
}

export type HorizontalActionSheetProps = {
  data: SheetDataProps[]
  onSelect: (value) => void
  _actionSheet: ActionSheetBaseProps
  actionSheetItemProps?: ActionSheetItemProps
}

const HorizontalActionSheet = ({
  data,
  onSelect,
  actionSheetItemProps,
  _actionSheet,
}: HorizontalActionSheetProps) => {
  const { sheetId, headerTitle, actions } = _actionSheet
  const handleClose = () => SheetManager.hide(sheetId)

  return (
    <ActionSheetBase
      sheetId={sheetId}
      headerTitle={headerTitle}
      actions={actions}
    >
      <View
        sx={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {data &&
          data.map((item) => (
            <ActionSheetItem
              key={item.value}
              icon={item.icon}
              onPress={() => {
                onSelect(item.value)
                handleClose()
              }}
              {...actionSheetItemProps}
            />
          ))}
      </View>
    </ActionSheetBase>
  )
}

export default HorizontalActionSheet
