import { GradientList } from 'app/components/Gradient'
import RoundedIcon from 'app/components/RoundedIcon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { Pressable, styled, Text, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'
type IconActionProps = {
  gradient: GradientList
  icon: string
  title?: string
  onPress: () => void
}

const ProfileAction = () => {
  const { push } = useRouter()

  const handleOnPress = () => {
    console.log('Profile action click')
  }

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Profile
  )
  const toDeposit = makeContextualHref('deposit')
  const toWithdrawal = makeContextualHref('withdrawal')
  const toBankAccount = makeContextualHref('bank-account')
  const toHistory = makeContextualHref('history')

  return (
    <StyledView>
      <IconAction
        gradient="lightRed"
        icon="dac"
        title="menu.deposit"
        onPress={() => {
          push(toDeposit, `/deposit`)
        }}
      />
      <IconAction
        gradient="lightGreen"
        icon="wda"
        title="menu.withdraw"
        onPress={() => push(toWithdrawal, '/withdrawal')}
      />
      <IconAction
        gradient="lightBlue"
        icon="card"
        title="menu.bankAccount"
        onPress={() => push(toBankAccount, '/profile/bank-account')}
      />
      <IconAction
        gradient="lightYellow"
        icon="history"
        title="menu.history"
        onPress={() => push(toHistory, '/profile/history')}
      />
    </StyledView>
  )
}

const IconAction = ({
  gradient,
  icon,
  title,
  onPress,
  ...rest
}: IconActionProps) => {
  const { t } = useLocalization()

  return (
    <View sx={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <RoundedIcon
        gradient={gradient}
        icon={icon}
        size="md"
        onPress={onPress}
      />
      {title && <StyledTextIcon>{t(title)}</StyledTextIcon>}
    </View>
  )
}

const StyledView = styled(View)(() => ({
  flexDirection: 'row',
  m: '$4',
  textAlign: 'center',
  justifyContent: 'space-between',
}))

const StyledTextIcon = styled(Text)(() => ({
  my: '$1',
  fontSize: 13,
  fontWeight: 'bold',
  flexWrap: 'nowrap',
}))

export default ProfileAction
