import BouncePressable from 'app/pressable/BouncePressable'
import { SafeAreaView, styled, Text, View } from 'dripsy'
import { useRouter } from 'solito/router'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'

const Header = ({ title }: { title: string }) => {
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }
  return (
    <SafeAreaView sx={{ bg: '$secondary' }}>
      <StyledTop
        gradient={'PaleBlue'}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <BouncePressable onPress={onGoBack}>
          <Icon name="chevleft" size={40} color="#9CD9FA" />
        </BouncePressable>
        <View sx={{ alignItems: 'center', flex: 0.9 }}>
          <Text sx={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            {title}
          </Text>
        </View>
      </StyledTop>
    </SafeAreaView>
  )
}

const StyledTop = styled(DripsyGradient)({
  flexDirection: 'row',
  py: '$2',
  alignItems: 'center',
})
export default Header
