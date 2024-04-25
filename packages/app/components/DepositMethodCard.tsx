import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import ShadowButton from 'app/components/ShadowButton'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { Text, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Shadow } from 'react-native-shadow-2'

type WithdrawalCardProps = {
  name: string
  icon: string
  onPress: () => void
}

const WithdrawalCard = ({ name, icon, onPress }: WithdrawalCardProps) => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      sx={{ marginVertical: 8, width: '47%' }}
    >
      <Shadow
        offset={[0, -1]}
        startColor={theme.colors?.$primary?.[100]}
        distance={1}
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <DripsyGradient
          gradient="surface"
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            p: 12,
            minHeight: 64,
          }}
        >
          <ShadowButton
            containerStyle={{ aspectRatio: 1 / 1, mr: 12, borderRadius: 24 }}
          >
            <Icon name={icon} />
          </ShadowButton>
          <Text numberOfLines={2} sx={{ flex: 1, fontWeight: 'bold' }}>
            {t(name)}
          </Text>
        </DripsyGradient>
      </Shadow>
    </TouchableOpacity>
  )
}

export default WithdrawalCard
