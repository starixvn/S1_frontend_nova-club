import BouncePressable from 'app/pressable/BouncePressable'
import { WithdrawalBankResult } from 'app/services/withdrawalBank.type'
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'dripsy'
import React from 'react'
import RoundedIcon from './RoundedIcon'

type BankSelectorProps = {
  bankList: WithdrawalBankResult[] | undefined
  isLoading: boolean
  selectedBank: number | undefined
  onPress: (number) => void
}

type BankItemProps = {
  bank: WithdrawalBankResult
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
}

const BankSelector = ({
  bankList,
  isLoading,
  selectedBank,
  onPress,
}: BankSelectorProps) => {
  const renderItem = ({ item }) => {
    return (
      <BankItem bank={item} loading={isLoading} onPress={() => onPress(item)} />
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList
          data={bankList}
          renderItem={renderItem}
          numColumns={4}
          keyExtractor={(item) => item.id}
          extraData={selectedBank}
        />
      )}
    </ScrollView>
  )
}

function BankItem({ bank, disabled, loading, onPress }: BankItemProps) {
  return (
    <BouncePressable disabled={disabled || loading} onPress={onPress}>
      <View
        sx={{
          alignItems: 'center',
        }}
      >
        <RoundedIcon
          size="small"
          key={bank.id}
          image={require('app/assets/images/home/fishing.png')}
          containerStyle={{
            m: '$2',
          }}
        />
        <Text
          sx={{
            color: 'black',
          }}
        >
          {bank.bank_code}
        </Text>
      </View>
    </BouncePressable>
  )
}

export default BankSelector
