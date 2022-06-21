import useLocalization from 'app/provider/localization'
import { PlayerBankResult, WithdrawalBankResult } from 'app/services/bank.type'
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

export type BankSelectorActionSheetProps = ComponentProps<
  typeof ActionSheet
> & {
  headerTitle: string
}
export type BankSelectorFlatListProps = ComponentProps<typeof FlatList> & {
  data: WithdrawalBankResult[] | PlayerBankResult[] | []
  isLoading: boolean
  selectedData: WithdrawalBankResult | PlayerBankResult
}
export interface BankSelectorForwardRef {
  showDialog: () => void
}

type BankSelectorProps = {
  // bankList: WithdrawalBankResult[] | PlayerBankResult[] | []
  // headerTitle: string
  // isLoading: boolean
  // selectedBank: number | undefined
  onPress: (number) => void
  _actionSheet: BankSelectorActionSheetProps
  _flatList: BankSelectorFlatListProps
}

type BankItemProps = {
  bank: WithdrawalBankResult | PlayerBankResult
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
}

const BankSelectorActionSheet = forwardRef<
  BankSelectorForwardRef,
  BankSelectorProps
>(({ _flatList, _actionSheet, onPress }: BankSelectorProps, ref) => {
  const { t } = useLocalization()
  const { headerTitle, ...restActionSheetProps } = _actionSheet || {}
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

  const renderItem = ({ item }) => {
    return (
      <BankItem
        bank={item}
        loading={isLoading}
        onPress={() => {
          onPress(item)
          ref?.current?.setModalVisible(false)
        }}
      />
    )
  }

  return (
    <ActionSheet
      ref={mergedRef}
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
      <ScrollView
        contentContainerSx={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          p: '$2',
          minHeight: 100,
        }}
        nestedScrollEnabled={true}
        onMomentumScrollEnd={() => mergedRef.current?.handleChildScrollEnd()}
      >
        {isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <FlatList
            // data={data}
            // keyExtractor={(item) => item?.bank_code}
            numColumns={4}
            extraData={selectedData}
            {...restFlatListProps}
            renderItem={renderItem}
          />
        )}
      </ScrollView>
    </ActionSheet>
  )
})

function BankItem({ bank, onPress }: BankItemProps) {
  return (
    <View
      sx={{
        alignItems: 'center',
      }}
    >
      <RoundedIcon
        size="lg"
        key={bank.id}
        icon={require('app/assets/images/home/fishing.png')}
        onPress={onPress}
        containerStyle={{
          m: '$0a',
        }}
      />
      <Text
        sx={{
          color: 'black',
        }}
      >
        {(bank as WithdrawalBankResult).bank_code
          ? bank.bank_code
          : bank.BankCode}
      </Text>
    </View>
  )
}

const StyledViewHeader = styled(DripsyGradient)({
  minHeight: 48,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  justifyContent: 'center',
  alignItems: 'center',
})

BankSelectorActionSheet.displayName = 'BankSelectorActionSheet'

export default BankSelectorActionSheet
