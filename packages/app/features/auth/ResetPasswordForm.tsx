import Input from 'app/components/form/Input'
import { Pressable, Text, View, styled } from 'dripsy'

const ResetPasswordForm = () => {
  return (
    <View
      sx={{
        width: '90%',
        py: 20,
      }}
    >
      <Input
        icon="pw"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
      />
      <Input
        icon="pw"
        placeholder="Confirm Password"
        secureTextEntry
        textContentType="password"
      />

      <ButtonContainer
        sx={{ bg: '$secondary.500', marginTop: 65 }}
        onPress={() => console.log('done register')}
      >
        <ButtonText>Submit</ButtonText>
      </ButtonContainer>
    </View>
  )
}

const ButtonContainer = styled(Pressable)({
  borderRadius: 15,
  mb: 20,
  alignItems: 'center',
})

const ButtonText = styled(Text)({
  width: '100%',
  py: 15,
  px: 25,
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'bold',
})

export default ResetPasswordForm
