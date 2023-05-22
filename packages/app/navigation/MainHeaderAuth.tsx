import { Gradient } from '@dripsy/gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { styled, SxProp, Text, View } from 'dripsy'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import useContextualRouter from './contextual/useContextualRouter'

const MainHeaderAuth = () => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <ImageTextButton
        colors={['#e9a918', '#fcf168']}
        label={t('auth.login')}
        iconName="login"
        sx={{ borderColor: '#dfdb18', borderRadius: 9 }}
        textStyle={{
          color: '#062440',
        }}
        onPress={() => {
          push('/auth/login')
        }}
      ></ImageTextButton>
      <ImageTextButton
        colors={['#b91011', '#fc9e9e']}
        label={t('auth.register')}
        iconName="edit"
        sx={{ borderColor: '#f06b6d', borderRadius: 9, ml: '$2' }}
        textStyle={{
          color: '#ffffff',
        }}
        onPress={() => {
          push('/auth/register')
        }}
      />
    </View>
  )
}

interface ImageTextButtonProps extends TouchableOpacityProps {
  sx?: SxProp
  textStyle?: SxProp
  label: string
  colors: string[]
  iconName: string
}

const ImageTextButton = ({
  sx,
  colors,
  label,
  textStyle,
  iconName,
  ...rest
}: ImageTextButtonProps) => {
  return (
    <Root
      sx={{
        ...sx,
      }}
      {...rest}
    >
      <Gradient
        colors={colors}
        sx={{ py: 1, px: 20, justifyContent: 'center' }}
      >
        <View sx={{ flexDirection: 'row' }}>
          <Icon
            name={iconName}
            size={13}
            sx={{ lineHeight: 18, paddingRight: 6, ...textStyle }}
          />
          <Text
            sx={{
              fontWeight: 'bold',
              fontSize: 12,
              textAlign: 'center',
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 2,
              ...textStyle,
            }}
          >
            {label.toUpperCase()}
          </Text>
        </View>
      </Gradient>
    </Root>
  )
}

const Root = styled(TouchableOpacity)({
  borderRadius: 4,
  overflow: 'hidden',
  borderWidth: 1,
})

const StyledSearchBox = styled(View)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  flexDirection: 'row',
  justifyContent: 'space-between',
  pr: '$3',
  overflow: 'hidden',
  alignItems: 'center',
})

export default MainHeaderAuth
