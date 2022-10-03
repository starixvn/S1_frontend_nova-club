import { GradientList } from 'app/components/Gradient'
import RoundedIcon from 'app/components/RoundedIcon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'
type IconActionProps = {
  gradient: GradientList
  icon: string
  title?: string
  disabled?: boolean
  onPress: () => void
}

const ProfileAction = ({ isCreditMember }) => {
  console.log('isCreditMember', isCreditMember)
  const { push } = useRouter()

  const { makeContextualHref } = useContextualRouting()
  const toTransferScanner = makeContextualHref('transfer-scanner')
  const toDeposit = makeContextualHref('deposit')
  const toWithdrawal = makeContextualHref('withdrawal')
  const toBankAccount = makeContextualHref('bank-account')
  const toHistory = makeContextualHref('history')

  return (
    <StyledView>
      <IconAction
        disabled={isCreditMember}
        gradient="lightPurple"
        icon="tf-user"
        title="menu.transfer"
        onPress={() => {
          push(toTransferScanner, `/transfer-scanner`)
        }}
      />
      <IconAction
        disabled={isCreditMember}
        gradient="lightRed"
        icon="dac"
        title="menu.deposit"
        onPress={() => {
          push(toDeposit, `/deposit`)
        }}
      />
      <IconAction
        disabled={isCreditMember}
        gradient="lightGreen"
        icon="wda"
        title="menu.withdraw"
        onPress={() => push(toWithdrawal, '/withdrawal')}
      />
      <IconAction
        disabled={isCreditMember}
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
  disabled,
  ...rest
}: IconActionProps) => {
  const { t } = useLocalization()

  return (
    <View
      sx={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <RoundedIcon
        disabled={disabled}
        gradient={gradient}
        icon={icon}
        onPress={onPress}
      />
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
