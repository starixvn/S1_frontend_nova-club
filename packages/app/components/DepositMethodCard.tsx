import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import ShadowButton from 'app/components/ShadowButton'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { PaymentMethodProps } from 'app/constants/deposit'
import useLocalization from 'app/provider/localization'
import { Text, View, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'

type DepositMethodCardProps = {
  item: PaymentMethodProps
  onPress: () => void
}

const DepositMethodCard = ({ item, onPress }: DepositMethodCardProps) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      sx={{ marginVertical: 8, width: '47%' }}
    >
      <Shadow
        offset={[0, -1]}
        startColor={theme.colors.$primary[100]}
        distance={0.2}
        style={{ borderRadius: 12, overflow: 'hidden', width: '100%' }}
      >
        <DripsyGradient
          gradient="surface"
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            p: 12,
          }}
        >
          <ShadowButton
            containerStyle={{ aspectRatio: 1 / 1, mr: 12, borderRadius: 24 }}
          >
            <Icon name={item.icon} />
          </ShadowButton>
          <Text numberOfLines={2} sx={{ flex: 1, fontWeight: 'bold' }}>
            {t(item.name)}
          </Text>
        </DripsyGradient>
      </Shadow>
    </TouchableOpacity>
  )
}

export default DepositMethodCard
