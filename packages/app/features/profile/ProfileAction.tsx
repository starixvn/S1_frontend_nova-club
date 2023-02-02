import { GradientList } from 'app/components/Gradient'
import RoundedIcon from 'app/components/RoundedIcon'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
type IconActionProps = {
  gradient: GradientList
  icon: string
  title?: string
  disabled?: boolean
  onPress: () => void
}

const ProfileAction = ({ isCreditMember }) => {
  const { push } = useContextualRouter()

  const { data: playerData } = usePlayerProfileQuery()
  const isPlayerName = !!playerData?.firstName

  return (
    <StyledView>
      <IconAction
        disabled={isCreditMember}
        gradient="lightPurple"
        icon="tf-user"
        title="menu.transfer"
        onPress={() => {
          push(`/transfer-scanner`)
        }}
      />
      <IconAction
        disabled={isCreditMember}
        gradient="lightRed"
        icon="dac"
        title="menu.deposit"
        onPress={() => {
          isPlayerName
            ? push(`/deposit`)
            : push(`/profile/account-verification`)
        }}
      />
      <IconAction
        disabled={isCreditMember}
        gradient="lightGreen"
        icon="wda"
        title="menu.withdraw"
        onPress={() => push('/withdrawal')}
      />
      <IconAction
        disabled={isCreditMember}
        gradient="lightBlue"
        icon="card"
        title="menu.bankAccount"
        onPress={() => push('/profile/bank-account')}
      />
      <IconAction
        gradient="lightYellow"
        icon="history"
        title="menu.history"
        onPress={() => push('/profile/history')}
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
