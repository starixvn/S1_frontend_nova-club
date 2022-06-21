import BouncePressable from 'app/pressable/BouncePressable'
import { SafeAreaView, styled, Text, View } from 'dripsy'
import { Platform, StatusBar } from 'react-native'
import { useRouter } from 'solito/router'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import useLocalization from 'app/provider/localization'

const Header = ({ title }: { title: string }) => {
  const isAndroid = Platform.OS === 'android'
  const { t } = useLocalization()
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }

  return (
    <View
      nativeID="pageback-header"
      sx={{
        borderBottomWidth: 1,
        borderColor: '$lightNavyBlue',
        mt: isAndroid ? StatusBar.currentHeight : 0,
      }}
    >
      <StyledTop
        sx={{ paddingTop: getStatusBarHeight(true) }}
        gradient={'PaleBlue'}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <BouncePressable onPress={onGoBack}>
          <Icon name="chevleft" size={40} color="#9CD9FA" />
        </BouncePressable>
        <View sx={{ alignItems: 'center', flex: 0.9 }}>
          <Text sx={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            {t(title)}
          </Text>
        </View>
      </StyledTop>
    </View>
  )
}

const StyledTop = styled(DripsyGradient)({
  flexDirection: 'row',
  py: '$2',
  alignItems: 'center',
})
export default Header
