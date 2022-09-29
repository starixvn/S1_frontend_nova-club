import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { View } from 'dripsy'
import React, { ComponentProps } from 'react'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import { useRouter } from 'solito/router'
import { Button } from '../form/Button'
import ActionSheetBase, { ActionSheetBaseProps } from './ActionSheetBase'
import ActionSheetItem, { ActionSheetItemProps } from './ActionSheetItem'

type SheetDataProps = {
  label: string
  value: string
  icon: string
}

export type ActionSheetProps = ActionSheetBaseProps & {
  variants?: 'provider' | 'bank'
  actionSheetItemProps?: Omit<ActionSheetItemProps, 'icon' | 'onPress'>
}

export type HorizontalActionSheetProps = {
  data: SheetDataProps[]
  onSelect: (value) => void
  _actionSheet: ActionSheetProps
} & Omit<ComponentProps<typeof ActionSheet>, 'children'>

const HorizontalActionSheet = ({
  data,
  onSelect,
  _actionSheet,
  ...rest
}: HorizontalActionSheetProps) => {
  const { sheetId, headerTitle, actions, variants, actionSheetItemProps } =
    _actionSheet

  const { t } = useLocalization()
  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const toAddBankAccount = makeContextualHref('add-bank-account')

  const handleClose = () => SheetManager.hide(sheetId)

  let containerStyle
  let imageStyle
  switch (variants) {
    case 'provider':
      containerStyle = { bg: '$primary', p: '$2' }
      imageStyle = { bg: '$transparent' }
      break

    default:
      break
  }
  return (
    <ActionSheetBase
      sheetId={sheetId}
      headerTitle={headerTitle}
      actions={actions}
      {...rest}
    >
      <View
        sx={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {data && data.length > 0 ? (
          data.map((item) => (
            <ActionSheetItem
              key={item.value}
              icon={item.icon}
              onPress={() => {
                onSelect(item)
                handleClose()
              }}
              containerStyle={containerStyle}
              imageStyle={imageStyle}
              {...actionSheetItemProps}
            />
          ))
        ) : (
          <View
            sx={{
              width: '100%',
              minHeight: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              rounded
              stretch
              variant="lg"
              fill={{
                type: 'gradient',
                color: 'secondary',
                start: { x: 0, y: 0 },
                end: { x: 1, y: 0 },
              }}
              onPress={() => {
                handleClose()
                push(toAddBankAccount, '/profile/bank-account/add-bank-account')
              }}
            >
              <Button.Label>{t('bank.addBankAccount')}</Button.Label>
            </Button>
          </View>
        )}
      </View>
    </ActionSheetBase>
  )
}

export default HorizontalActionSheet
