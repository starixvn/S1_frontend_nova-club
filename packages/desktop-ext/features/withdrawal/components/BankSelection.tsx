import Icon from 'app/components/Icon'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { Options } from 'app/components/select/Select'
import { SelectProps } from 'app/components/select/Select'
import useLocalization from 'app/provider/localization'
import { Row, Text, View, styled } from 'dripsy'
import React from 'react'
import { SelectOptions } from 'services/common/types'
import { SolitoImage } from 'solito/image'

type BankSelectionProps = {
  label: string
  subtitle: string
  subtitleNote: string
  list: SelectOptions[]
  selected?: string
  isCrypto?: boolean
  onPress: (arg0) => void
  onAddNewAccount: () => void
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
}: BankSelectionProps) => {
  return (
    <View sx={{ mb: '$3' }}>
      <Text>{label}</Text>
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
            gap: '$3',
            alignItems: 'center',
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
                />
              )
            })}
          {list && list.length < 3 && (
            <AddNewAccount isCrypto={isCrypto} onPress={onAddNewAccount} />
          )}
        </Row>
      </SelectContainer>
    </View>
  )
}

const SelectionItem = ({ isCrypto, isActive, label, img, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <SelectedContainer isActive={isActive}>
        <View
          sx={{
            width: 150,
            aspectRatio: 2 / 1,
            alignItems: 'center',
            justifyContent: 'center',
            p: 12,
            bg: '$primary.300',
          }}
        >
          {isCrypto ? (
            <Text
              sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}
            >
              {label.replace('-', ' ')}
            </Text>
          ) : (
            <SolitoImage
              fill
              alt="bank image"
              src={img}
              resizeMode="cover"
              placeholder="empty"
            />
          )}
        </View>
      </SelectedContainer>
    </TouchableOpacity>
  )
}

const AddNewAccount = ({ isCrypto, onPress }) => {
  const { t } = useLocalization()
  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        sx={{
          borderRadius: 24,
          width: 150,
          aspectRatio: 2 / 1,
          borderWidth: 1,
          borderColor: 'white',
          borderStyle: 'dashed',
          p: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Icon name="add" size={12} sx={{ p: 12 }} />
        <Text>{isCrypto ? t('menu.cryptoWallet') : t('menu.bankAccount')}</Text>
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
    borderWidth: isActive ? 4 : 0,
    borderColor: '$primary.100',
    borderRadius: 24,
    overflow: 'hidden',
  })
)

export default BankSelection
