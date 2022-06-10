import { GradientList } from 'app/components/Gradient'
import RoundedIcon from 'app/components/RoundedIcon'
import BouncePressable from 'app/pressable/BouncePressable'
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

  return (
    <StyledView>
      <IconAction
        gradient="lightRed"
        icon="sb"
        title="Deposit"
        onPress={() => {
          push('/deposit')
        }}
      />
      <IconAction
        gradient="lightGreen"
        icon="games"
        title="Withdraw"
        onPress={() => push('/withdrawal')}
      />
      <IconAction
        gradient="lightBlue"
        icon="sl"
        title="Bank Account"
        onPress={() => push('/profile/bank-account')}
      />
      <IconAction
        gradient="lightYellow"
        icon="lc"
        title="History"
        onPress={handleOnPress}
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
  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <RoundedIcon
        gradient={gradient}
        icon={icon}
        size="md"
        onPress={onPress}
      />
      {title && <StyledTextIcon>{title}</StyledTextIcon>}
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
