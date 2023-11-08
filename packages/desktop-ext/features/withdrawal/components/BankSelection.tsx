import Icon from 'app/components/Icon'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Pressable, Row, SxProp, Text, View, styled } from 'dripsy'

import React, { ComponentProps } from 'react'

import { SelectOptions } from 'services/common/types'
import { SolitoImageProps } from 'solito/build/image/image.types'
import { SolitoImage } from 'solito/image'
import { ImageContentFit } from 'expo-image'
import { toCurrency } from 'app/utils'
import { usePlayerProfileQuery } from 'services/playerApi'

type Prettier<T> = {
  [K in keyof T]: T[K]
} & {}

type BankSelectionProps = {
  label: string
  subtitle: string
  subtitleNote?: string
  list: SelectOptions[]
  selected?: string
  isCrypto?: boolean
  onPress: (arg0) => void
  onAddNewAccount?: () => void
  imageMode?: ImageContentFit
}

type AddNewAccountProps = {
  isCrypto: boolean
  onPress: () => void
  containerStyle?: SxProp
}

const BankSelection = ({
  label,
  subtitle,
  subtitleNote,
  list,
  selected,
  isCrypto = false,
  onPress,
  onAddNewAccount,
  imageMode = 'cover',
}: BankSelectionProps) => {
  return (
    <View sx={{ mb: '$3' }}>
      <Text sx={{ mb: '$2' }}>{label}</Text>
      <SelectContainer>
        <Text sx={{ fontSize: 18, fontWeight: 'bold', mb: '$1' }}>
          {subtitle}
        </Text>
        {subtitleNote ? (
          <Text
            sx={{ color: '$secondary.500', fontSize: 18, fontWeight: 'bold' }}
          >
            {subtitleNote}
          </Text>
        ) : null}
        <Row
          sx={{
            py: '$3',
            gap: '$1',
            flexWrap: 'wrap',
          }}
        >
          {list &&
            list.map((item, index) => {
              const isActive = item.value === selected

              const handlePress = () => {
                onPress(item.value)
              }
              return (
                <SelectionItem
                  key={index}
                  isCrypto={isCrypto}
                  isActive={isActive}
                  label={item.label}
                  img={item.icon}
                  onPress={handlePress}
                  imageMode={imageMode}
                  limit={item.limit}
                />
              )
            })}
          {!!onAddNewAccount && !isCrypto && list && list.length < 3 && (
            <AddNewAccount
              isCrypto={isCrypto}
              onPress={onAddNewAccount}
              containerStyle={{
                width: 120,
                aspectRatio: 16 / 9,
              }}
            />
          )}
        </Row>
      </SelectContainer>
    </View>
  )
}

const SelectionItem = ({
  isCrypto,
  isActive,
  label,
  img,
  onPress,
  imageMode,
  limit,
}) => {
  const { t } = useLocalization()
  const { currency } = usePlayerProfileQuery()

  const minAmount = toCurrency(limit?.min ?? 0, currency, {
    symbol: false,
    forceDecimal: false,
  })

  const maxAmount = toCurrency(limit?.max ?? 0, currency, {
    symbol: false,
    forceDecimal: false,
  })
  return (
    <View>
      <Pressable onPress={onPress}>
        <SelectedContainer isActive={isActive}>
          <View
            sx={{
              width: 120,
              aspectRatio: 16 / 9,
              alignItems: 'center',
              justifyContent: 'center',
              // bg: 'white',
            }}
          >
            <SolitoImage
              fill
              alt="bank image"
              src={img}
              contentFit={imageMode}
              placeholder="empty"
            />
          </View>
        </SelectedContainer>
      </Pressable>
      {limit && (
        <View
          sx={{
            flex: 1,
            flexDirection: 'row',
            mt: '$1',
            px: '$2',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <StyledTextContainer>
            <StyledMinMaxText>{`${t('deposit.minLimit')}:`}</StyledMinMaxText>
            <StyledMinMaxText>{`${t('deposit.maxLimit')}:`}</StyledMinMaxText>
          </StyledTextContainer>
          <StyledTextContainer>
            <StyledMinMaxText2>{`${minAmount}`}</StyledMinMaxText2>
            <StyledMinMaxText2>{`${maxAmount}`}</StyledMinMaxText2>
          </StyledTextContainer>
        </View>
      )}
    </View>
  )
}

export const AddNewAccount = ({
  isCrypto,
  onPress,
  containerStyle,
}: AddNewAccountProps) => {
  const { t } = useLocalization()
  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        sx={{
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'white',
          borderStyle: 'dashed',
          p: 12,
          alignItems: 'center',
          ...containerStyle,
        }}
      >
        <Icon name="add" size={12} sx={{ mr: 4 }} />
        <Text sx={{ textAlign: 'center', fontSize: 15 }}>
          {isCrypto ? t('menu.cryptoWallet') : t('menu.bankAccount')}
        </Text>
      </Row>
    </TouchableOpacity>
  )
}

const SelectContainer = styled(View)({
  borderRadius: 12,
  borderColor: '$primary.200',
  py: '$2',
  px: '2%',
  borderWidth: 1,
  position: 'relative',
})

const SelectedContainer = styled(View)(
  ({ isActive }: { isActive: boolean }) => ({
    borderWidth: 4,
    borderColor: isActive ? '$selectionColor' : 'transparent',
    borderRadius: 12,
    overflow: 'hidden',
  })
)
export const StyledTextContainer = styled(View)({
  justifyContent: 'flex-start',
  minWidth: 40,
  maxWidth: 60,
})

export const StyledMinMaxText = styled(Text)({
  fontSize: 10,
  textAlign: 'right',
  flex: 1,
})
export const StyledMinMaxText2 = styled(Text)({
  fontSize: 10,
  textAlign: 'left',
  flex: 1,
})
export default BankSelection
