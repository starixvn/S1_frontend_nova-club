import useOrientation from 'app/hooks/useOrientation'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { styled, Text, useSx, View } from 'dripsy'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'

const Header = ({ title, actions }: { title: string }) => {
  const isAndroid = Platform.OS === 'android'
  const { t } = useLocalization()
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }

  const { orientation, isLandscape } = useOrientation()

  const { top, right } = useSafeArea()

  const sx = useSx()

  const headerHeight = sx({
    height: 'header',
  })
  return (
    <View
      nativeID="pageback-header"
      sx={{
        borderBottomWidth: 1,
        borderBottomColor: '#33A0D0',
      }}
    >
      <DripsyGradient
        sx={{
          paddingTop: top,
        }}
        gradient={'PaleBlue'}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <StyledTop
          sx={{
            ...(isLandscape ? {} : headerHeight),
            px: isLandscape ? '$6' : '$2',
          }}
        >
          <BouncePressable
            onPress={onGoBack}
            sx={{ p: '$2', px: '$4', paddingLeft: right }}
          >
            <Icon
              name="chevleft"
              size={isLandscape ? 14 : 20}
              color="#9CD9FA"
            />
          </BouncePressable>
          <View sx={{ alignItems: 'center', flex: 0.9 }}>
            <Text
              sx={{
                fontSize: isLandscape ? 14 : 20,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {t(title)}
            </Text>
          </View>

          {actions && (
            <View
              sx={{ position: 'absolute', right: isLandscape ? right : '$2' }}
            >
              {actions}
            </View>
          )}
        </StyledTop>
      </DripsyGradient>
    </View>
  )
}

const StyledTop = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})
export default Header
