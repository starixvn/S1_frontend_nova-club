import IconButton from 'agent/components/Icon/IconButton'
import RefreshButton from 'agent/components/Icon/RefreshButton'
import Text from 'agent/components/Text'
import { useLazyUserRefreshBalanceQuery } from 'agent/services/userApi'
import { UserInfo } from 'agent/services/userApi.type'
import { LANGUAGE_CODE } from 'app/constant/language'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import BouncePressable from 'app/pressable/BouncePressable'
import TouchableOpacity from 'app/pressable/TouchableOpacity'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { toCurrency } from 'app/utils'
import { Currency } from 'app/utils/constant'
import { Image, styled, useSx, View } from 'dripsy'
import { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { useDispatch } from 'react-redux'
import MainMenuTest from './MainMenu'

type HeaderProps = {
  userData: UserInfo | any
} & React.ComponentProps<typeof View>

const Header = ({ userData }: HeaderProps) => {
  const dispatch = useDispatch()
  const lang = useAppSelector((state) => state.setting?.locale)
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { top } = useSafeArea()
  const sx = useSx()
  const { push } = useContextualRouter()
  const { t } = useLocalization()

  //get user info here
  const currency = userData?.wallet.currency as Currency
  const isShareHolder = userData?.role === 'shareholder' ? true : false
  const [getBalance] = useLazyUserRefreshBalanceQuery()

  const headerHeight = sx({
    height: 'header',
  }).height

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: headerHeight })

  const iconHeight = headerHeight.map((x) => x * 0.7)
  const smallIconHeight = headerHeight.map((x) => x * 0.5)

  async function testActionWithTimeout() {
    setIsLoading(true)
    const data = await getBalance().unwrap()
    setTimeout(() => setIsLoading(false), 1500)
  }

  const countryImg = {
    [LANGUAGE_CODE.ENGLISH]: require('app/assets/images/common/icon-en.png'),
    [LANGUAGE_CODE.VIETNAM]: require('app/assets/images/common/icon-vn.png'),
  }

  const onChangeLanguage = (value: LANGUAGE_CODE) => {
    dispatch(SettingActions.setLocale(value))
  }

  return (
    <>
      <View sx={{ bg: '#004fd0' }}>
        <View sx={{ paddingTop: top }}>
          <StyledContainer sx={{ height: headerHeight }}>
            <View>
              <BouncePressable
                onPress={() => {
                  console.log('logo pressed')
                }}
                sx={{ px: '$2', mb: 5 }}
              >
                <StyledLogo
                  sx={sx({
                    height: iconHeight,
                    width: iconHeight.map((x) => x * (519 / 186)),
                  })}
                  source={require('app/assets/images/logo.png')}
                  resizeMode="contain"
                />
              </BouncePressable>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <View sx={{ flexDirection: 'row', alignItems: 'center', mx: 4 }}>
                <View>
                  <Text
                    sx={{
                      color: '#95C4FF',
                      textAlign: 'center',
                      lineHeight: 12,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    VND
                  </Text>
                  <Text
                    sx={{
                      mr: '$2',
                      color: 'white',
                      lineHeight: 14,
                      fontSize: 14,
                    }}
                  >
                    {toCurrency(
                      userData?.wallet.balance.toString() ?? 0,
                      currency,
                      {
                        hideTruncatedThousand: false,
                        forceDecimal: false,
                        symbol: false,
                      }
                    )}
                  </Text>
                </View>

                <RefreshButton
                  loading={isLoading}
                  onPress={() => testActionWithTimeout()}
                  size={16}
                />
                <IconButton
                  name="table"
                  size={16}
                  sx={{ ml: '$2', mr: '$2' }}
                  onPress={() => {
                    push('/agent/commission')
                    // navigation.dispatch(StackActions.push('AgentCommission'))
                  }}
                />
              </View>

              {/* <View sx={{ flexDirection: 'row', alignItems: 'center', mx: 4 }}>
                <IconButton name="table" size={24} />
              </View> */}

              <TouchableOpacity
                sx={{ flexDirection: 'column', alignItems: 'center' }}
                onPress={() => {
                  push('/agent')
                }}
              >
                <Text sx={{ fontWeight: 'bold', fontSize: 10, color: 'white' }}>
                  {userData?.name}
                </Text>
                <View
                  sx={{
                    borderRadius: 10,
                    paddingX: isShareHolder ? 10 : 20,
                    backgroundColor: isShareHolder ? '#ffd900' : '#d02fa9',
                  }}
                >
                  <Text
                    sx={{
                      color: isShareHolder ? '#000' : '#fff',
                      fontStyle: 'italic',
                      fontSize: 10,
                      marginBottom: 3,
                    }}
                  >
                    {t(`common.${userData?.role}`)}
                  </Text>
                </View>
              </TouchableOpacity>

              <View>
                <BouncePressable
                  onPress={() =>
                    onChangeLanguage(
                      lang === LANGUAGE_CODE.ENGLISH
                        ? LANGUAGE_CODE.VIETNAM
                        : LANGUAGE_CODE.ENGLISH
                    )
                  }
                >
                  <StyledImg
                    sx={{ width: smallIconHeight, height: smallIconHeight }}
                    source={countryImg[lang]}
                    resizeMode="contain"
                  />
                </BouncePressable>
              </View>

              <View>
                <BouncePressable
                  onPress={() => setShowMenu(!showMenu)}
                  onLayout={(event: LayoutChangeEvent) => {
                    const { x, width } = event.nativeEvent.layout
                    const menuXPosition = x + width

                    setMenuPosition((position) => ({
                      ...position,
                      x: menuXPosition,
                    }))
                  }}
                >
                  <StyledImg
                    sx={{ width: iconHeight, height: iconHeight }}
                    source={require('app/assets/images/header/menu.png')}
                    resizeMode="contain"
                  />
                </BouncePressable>

                <MainMenuTest
                  isShow={showMenu}
                  onMenu={(e) => {
                    return setShowMenu(e)
                  }}
                  parentPosition={menuPosition}
                />
              </View>
            </View>
          </StyledContainer>
        </View>
      </View>
    </>
  )
}

const StyledContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  px: '$2',
})

const StyledLogo = styled(Image)({})

const StyledImg = styled(Image)({
  ml: '$2',
})

export default Header
