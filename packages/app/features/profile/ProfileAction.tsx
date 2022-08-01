import { GradientList } from 'app/components/Gradient'
import RoundedIcon from 'app/components/RoundedIcon'
import useContextualRouting from 'app/hooks/useContextualRouting'
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

  const { makeContextualHref } = useContextualRouting()
  const toTransferScanner = makeContextualHref('transfer-scanner')
  const toDeposit = makeContextualHref('deposit')
  const toWithdrawal = makeContextualHref('withdrawal')
  const toBankAccount = makeContextualHref('bank-account')
  const toHistory = makeContextualHref('history')

  return (
    <StyledView>
      <IconAction
        gradient="lightPurple"
        icon="transfer"
        title="menu.transfer"
        onPress={() => {
          push(toTransferScanner, `/transfer-scanner`)
        }}
      />
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
    <View sx={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
      <RoundedIcon gradient={gradient} icon={icon} onPress={onPress} />
      {title && <StyledTextIcon>{t(title)}</StyledTextIcon>}
    </View>
  )
}

const StyledView = styled(View)(() => ({
  flexDirection: 'row',
  my: '$4',
  textAlign: 'center',
  justifyContent: 'space-between',
  width: '100%',
}))

const StyledTextIcon = styled(Text)(() => ({
  my: '$1',
  fontSize: 12,
  fontWeight: 'bold',
  flexWrap: 'nowrap',
  textAlign: 'center',
}))

export default ProfileAction
