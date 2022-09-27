import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import React, { useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import SelectLists from '../form/Select/SelectLists'
import { DripsyGradient } from '../Gradient'
import ActionSheetBase, { ActionSheetBaseProps } from './ActionSheetBase'
import { ActionSheetItemProps } from './ActionSheetItem'

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

const ListActionSheet = ({
  data,
  onSelect,
  actionSheetItemProps,
  _actionSheet,
}: HorizontalActionSheetProps) => {
  const { sheetId, headerTitle, actions } = _actionSheet
  const { bottom } = useSafeArea()
  const _ref = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClose = () => SheetManager.hide(sheetId)

  return (
    <ActionSheetBase
      sheetId={sheetId}
      headerTitle={headerTitle}
      actions={actions}
    >
      <DripsyGradient
        gradient="darkNavyBlue"
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        sx={{
          pb: bottom,
          maxHeight: Dimensions.get('window').height * 0.5,
        }}
      >
        <SelectLists
          actionSheetRef={_ref}
          data={data}
          onPress={handleClose}
          selectedIndex={activeIndex}
          setSelectedValue={(item) => onSelect(item.value)}
          setSelectedIndex={(el) => {
            setActiveIndex(el)
          }}
        />
      </DripsyGradient>
    </ActionSheetBase>
  )
}

export default ListActionSheet
