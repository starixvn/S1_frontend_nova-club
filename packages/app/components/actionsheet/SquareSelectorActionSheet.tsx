import useLocalization from 'app/provider/localization'
import { PlayerBankResult, WithdrawalBankResult } from 'services/bank.type'
import { mergeRefs } from 'app/utils/mergeRefs'
import {
  ActivityIndicator,
  FlatList,
  styled,
  Text,
  useDripsyTheme,
  View,
} from 'dripsy'
import React, { ComponentProps, createRef, forwardRef } from 'react'
import { Platform } from 'react-native'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import { DripsyGradient } from '../Gradient'
import { getBankLogo } from 'app/config/bank'
import { Button } from '../form/Button'
import { useRouter } from 'solito/router'
import useContextualRouting from 'app/hooks/useContextualRouting'
import ActionSheetItem from './ActionSheetItem'
import { getProviderLogo } from 'app/config/games/provider'
import IconButton from '../form/IconButton'
import Icon from '../Icon'
import { ACTION_SHEET_ID } from 'app/constant/actionSheet'

export type SquareSelectorActionSheetProps = ComponentProps<
  typeof ActionSheet
> & {
  headerTitle: string
}
export type SquareSelectorFlatListProps = ComponentProps<typeof FlatList> & {
  data: WithdrawalBankResult[] | PlayerBankResult[] | []
  isLoading: boolean
  titleType: string
  key: string | number
  logo?: string
  setSelectedValue: (object) => void
  onPress: (object) => void
}
export interface SquareSelectorForwardRef {}

type SquareSelectorProps = {
  onPress: (number) => void
  _actionSheet: SquareSelectorActionSheetProps
  _dataList: SquareSelectorFlatListProps
}

export const DEFAULT_SQUARE_ACTION_SHEET_ID = 'SquareSelector'
export const SQUARE_NUMBER_OF_COLUMNS = 4

const SquareSelectorActionSheet = forwardRef<
  SquareSelectorForwardRef,
  SquareSelectorProps
>(({ _dataList, _actionSheet }: SquareSelectorProps, ref) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const toAddBankAccount = makeContextualHref('add-bank-account')
  const toBankAccount = makeContextualHref('bank-account')

  const {
    id: actionSheetId,
    headerTitle,
    ...restActionSheetProps
  } = _actionSheet || {}

  const {
    data,
    isLoading,
    onPress,
    titleType,
    key,
    logo = 'bank',
    ...restFlatListProps
  } = _dataList || {}
  const { theme } = useDripsyTheme()
  const _ref = createRef()
  const mergedRef = mergeRefs([_ref, ref])

  const getLogo = (code) => {
    switch (logo) {
      case 'bank':
        return getBankLogo(code)
      case 'provider':
        return getProviderLogo(code)
      default:
        break
    }
  }

  const closeActionSheet = async () => {
    await SheetManager.hide(actionSheetId ?? DEFAULT_SQUARE_ACTION_SHEET_ID)
  }

  const HeaderComponent = (
    <StyledViewHeader gradient="secondary">
      <Text
        sx={{
          fontWeight: 'bold',
          fontSize: 22,
          textAlign: 'center',
        }}
        numberOfLines={1}
      >
        {t(headerTitle)}
      </Text>

      {actionSheetId === ACTION_SHEET_ID.WITHDRAWAL && (
        <View
          sx={{
            flexDirection: 'row',
            position: 'absolute',
            right: 12,
            m: '$2',
          }}
        >
          <IconButton
            name="card"
            onPress={() => {
              closeActionSheet()
              push(toBankAccount, '/profile/bank-account')
            }}
          />
        </View>
      )}
    </StyledViewHeader>
  )

  return (
    <ActionSheet
      ref={mergedRef}
      id={actionSheetId ?? DEFAULT_SQUARE_ACTION_SHEET_ID}
      gestureEnabled={Platform.OS === 'web' ? false : true}
      CustomHeaderComponent={HeaderComponent}
      headerAlwaysVisible={true}
      containerStyle={{
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderRadius: 0,
        maxWidth: theme.sizes.container,
      }}
      {...restActionSheetProps}
    >
      <View
        sx={{
          p: '$1',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          minHeight: 100,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'$lightCyan'} />
        ) : data && data?.length > 0 ? (
          <View
            sx={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
          >
            {data.map((item) => (
              <ActionSheetItem
                key={item[key]}
                icon={getLogo(item[titleType])}
                title={item[titleType]}
                onPress={() => {
                  // onPress(item)
                  onPress({ ...item, logo: getLogo(item[titleType]) })
                  closeActionSheet()
                }}
              />
            ))}
          </View>
        ) : actionSheetId === ACTION_SHEET_ID.WITHDRAWAL ? (
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
              closeActionSheet()
              push(toAddBankAccount, '/profile/bank-account/add-bank-account')
            }}
          >
            <Button.Label>{t('bank.addBankAccount')}</Button.Label>
          </Button>
        ) : (
          <Text sx={{ color: 'black' }}>{t('common.emptyResult')}</Text>
        )}
      </View>
    </ActionSheet>
  )
})

const StyledViewHeader = styled(DripsyGradient)({
  minHeight: 48,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
})

SquareSelectorActionSheet.displayName = 'SquareSelectorActionSheet'

export default SquareSelectorActionSheet
