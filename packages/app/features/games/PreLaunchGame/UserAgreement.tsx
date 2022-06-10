import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import { styled, Text, View } from 'dripsy'

const UserAgreement = ({ onAgree, isAgree }) => {
  return (
    <SytledView>
      <StyledBouncePressable
        onPress={() => {
          onAgree(!isAgree)
        }}
      >
        {isAgree && (
          <Icon
            name="tick"
            color="green"
            sx={{ alignSelf: 'center' }}
            size={15}
          />
        )}
      </StyledBouncePressable>
      <StyleText>
        I have read & agree the{' '}
        <StylePressableText>User agreement</StylePressableText>
      </StyleText>
    </SytledView>
  )
}

const SytledView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  mt: '$6',
  alignItems: 'center',
})

const StyledBouncePressable = styled(BouncePressable)({
  bg: '#FFFFFF',
  borderRadius: 2,
  height: 15,
  aspectRatio: 1,
})

const StyleText = styled(Text)({
  fontSize: 11,
  ml: '$1a',
  color: '#DBDBDB',
})

const StylePressableText = styled(Text)({
  fontSize: 11,
  color: '#FF7070',
  textDecorationLine: 'underline',
})

export default UserAgreement
