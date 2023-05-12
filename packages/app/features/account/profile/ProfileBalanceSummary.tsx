import Icon from 'app/components/Icon'
import { Text, View, styled, useDripsyTheme } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti/build'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

interface HiddenItemProps {
  color: string
  iconName: string
  value: string
  label: string
}

interface ProfileSummaryTextProps {
  px?: number
  fontSize?: number
  color?: string
}

const ProfileBalanceSummary = () => {
  const { theme } = useDripsyTheme()
  const [isExtend, setIsExtend] = useState(false)

  const handlePress = () => {
    setIsExtend(!isExtend)
  }
  return (
    <ProfileBalanceSummaryContainer>
      <BalanceSection>
        <BalanceItem>
          <Icon
            name={'wallet'}
            color={theme.colors.$secondary[100]}
            sx={{ px: 5 }}
          />
          <ProfileSummaryText px={5}>Balance</ProfileSummaryText>
        </BalanceItem>
        <BalanceItem>
          <ProfileSummaryText px={5} color={theme.colors.$secondary[100]}>
            6,854.4K
          </ProfileSummaryText>

          <MotiView
            from={{ transform: [{ rotate: '0deg' }] }}
            animate={{
              transform: [{ rotate: isExtend ? '-180deg' : '0deg' }],
            }}
            transition={{ type: 'timing' }}
          >
            <TouchableOpacity onPress={handlePress}>
              <Icon name={'down'} color={'white'} sx={{ p: 10 }} size={16} />
            </TouchableOpacity>
          </MotiView>
        </BalanceItem>
      </BalanceSection>
      <AnimatePresence>
        {isExtend && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 100 }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              height: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            transition={{ type: 'timing' }}
          >
            <HiddenItem
              color={theme.colors.$secondary[100]}
              iconName="ac"
              label="cash"
              value="6,854.3K"
            />
            <View sx={{ backgroundColor: '$primary.100', width: 1 }} />
            <HiddenItem
              color={theme.colors.$secondary[100]}
              iconName="gift"
              label="reward"
              value="3"
            />
          </MotiView>
        )}
      </AnimatePresence>
    </ProfileBalanceSummaryContainer>
  )
}

const HiddenItem = ({ color, iconName, value, label }: HiddenItemProps) => {
  return (
    <HiddenItemContainer>
      <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={iconName} color={color} sx={{ px: 5 }} size={24} />
        <ProfileSummaryText fontSize={12} px={10}>
          {label}
        </ProfileSummaryText>
      </View>
      <View
        sx={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ProfileSummaryText fontSize={20}>{value}</ProfileSummaryText>
      </View>
    </HiddenItemContainer>
  )
}

const ProfileBalanceSummaryContainer = styled(View)({
  flexDirection: 'column',
  maxWidth: '85%',
  width: 500,
  borderRadius: 15,
  borderColor: '$primary.100',
  borderWidth: 1,
  my: 20,
})

const BalanceSection = styled(View)({
  flexDirection: 'row',
  px: 15,
  py: 20,
  justifyContent: 'space-between',
})

const BalanceItem = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const HiddenItemContainer = styled(View)({
  px: 15,
  py: 10,
  width: '50%',
  flexDirection: 'column',
  borderTopColor: '$primary.100',
  borderTopWidth: 1,
})

const ProfileSummaryText = styled(Text)(
  ({ color = 'white', fontSize = 16, px = 0 }: ProfileSummaryTextProps) => ({
    fontSize,
    px,
    color,
    fontWeight: '500',
    textTransform: 'uppercase',
  })
)

export default ProfileBalanceSummary
