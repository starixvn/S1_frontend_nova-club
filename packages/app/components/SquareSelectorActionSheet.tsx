import useLocalization from 'app/provider/localization'
import { PlayerBankResult, WithdrawalBankResult } from 'services/bank.type'
import { mergeRefs } from 'app/utils/mergeRefs'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  styled,
  Text,
  useDripsyTheme,
  View,
} from 'dripsy'
import React, { ComponentProps, createRef, forwardRef } from 'react'
import { Platform } from 'react-native'
import ActionSheet from 'react-native-actions-sheet'
import { DripsyGradient } from './Gradient'
import RoundedIcon from './RoundedIcon'

export type SquareSelectorActionSheetProps = ComponentProps<
  typeof ActionSheet
> & {
  headerTitle: string
}
export type SquareSelectorFlatListProps = ComponentProps<typeof FlatList> & {
  data: WithdrawalBankResult[] | PlayerBankResult[] | []
  isLoading: boolean
  selectedData: WithdrawalBankResult | PlayerBankResult
}
export interface SquareSelectorForwardRef {
  showDialog: () => void
}

type SquareSelectorProps = {
  // bankList: WithdrawalBankResult[] | PlayerBankResult[] | []
  // headerTitle: string
  // isLoading: boolean
  // selectedBank: number | undefined
  onPress: (number) => void
  _actionSheet: SquareSelectorActionSheetProps
  _flatList: SquareSelectorFlatListProps
}

type BankItemProps = {
  bank: WithdrawalBankResult | PlayerBankResult
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
}

export const DEFAULT_SQUARE_ACTION_SHEET_ID = 'SquareSelector'

const SquareSelectorActionSheet = forwardRef<
  SquareSelectorForwardRef,
  SquareSelectorProps
>(({ _flatList, _actionSheet, onPress }: SquareSelectorProps, ref) => {
  const { t } = useLocalization()

  const {
    id: actionSheetId,
    headerTitle,
    ...restActionSheetProps
  } = _actionSheet || {}

  const { isLoading, selectedData, ...restFlatListProps } = _flatList || {}
  const { theme } = useDripsyTheme()

  const _ref = createRef()

  const mergedRef = mergeRefs([_ref, ref])

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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          p: '$2',
          minHeight: 100,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <FlatList
            numColumns={4}
            extraData={selectedData}
            {...restFlatListProps}
          />
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
})

SquareSelectorActionSheet.displayName = 'SquareSelectorActionSheet'

export default SquareSelectorActionSheet
