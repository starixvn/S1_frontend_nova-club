import Icon from 'agent/components/Icon'
import RefreshButton from 'agent/components/Icon/RefreshButton'
import Text from 'agent/components/Text'
import {
  useLazyUserRefreshBalanceQuery,
  useUserInfoQuery,
} from 'agent/services/userApi'
import BouncePressable from 'app/components/pressable/BouncePressable'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { useAgentLocalization } from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { toCurrency } from 'app/utils'
import { Currency, LANGUAGE_CODE } from 'app/utils/constant'
import { ActivityIndicator, Image, View, styled, useSx } from 'dripsy'
import { useState } from 'react'
import { ColorValue, LayoutChangeEvent } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import { AGENT_TAB_HEIGHT } from '../constant/sizes'
import MainMenuTest from './MainMenu'
import MainMenu from './MainMenu'

const iconHeight = AGENT_TAB_HEIGHT * 0.6
const smallIconHeight = AGENT_TAB_HEIGHT * 0.5

const Header = () => {
  const dispatch = useDispatch()
  const lang = useAppSelector((state) => state.setting?.locale)
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { top, left, right } = useSafeArea()
  const sx = useSx()
  const { push } = useRouter()
  const { t } = useAgentLocalization()
  const token = useAppSelector((s) => s.agent.access_token)

  const { balance, currency, role, userName, data } = useUserInfoQuery(
    undefined,
    {
      selectFromResult: ({ data }) => ({
        currency: data?.wallet.currency as Currency,
        userName: data?.username,
        balance: data?.wallet?.balance ?? 0,
        role: data?.role,
        data,
      }),
      skip: !token,
    }
  )
  //get user info here
  const isShareHolder = role === 'shareholder'
  const balanceColor =
    balance === 0 ? 'white' : balance < 0 ? '#ff2736' : '#00ECA4'
  const [getBalance] = useLazyUserRefreshBalanceQuery()

  const headerHeight = AGENT_TAB_HEIGHT
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: headerHeight })

  async function testActionWithTimeout() {
    setIsLoading(true)
    const data = await getBalance().unwrap()
    setTimeout(() => setIsLoading(false), 1500)
  }

  const countryImg = {
    [LANGUAGE_CODE.ENGLISH]: require('app/assets/images/common/en.jpg'),
    [LANGUAGE_CODE.VIETNAM]: require('app/assets/images/common/vn.jpg'),
  }

  const onChangeLanguage = (value: LANGUAGE_CODE) => {
    dispatch(SettingActions.setLocale(value))
  }

  return (
    <View sx={{ bg: '#004fd0', pt: top, pl: left, pr: right }}>
      <View sx={{ py: '$1', px: '$1' }}>
        <StyledContainer sx={{ height: headerHeight }}>
          <View>
            <BouncePressable
              onPress={() => {
                push('/agent/profile')
              }}
              sx={{ pr: '$2' }}
            >
              <StyledLogo
                sx={sx({
                  height: iconHeight,
                  width: iconHeight * (200 / 90),
                })}
                source={require('agent/assets/images/Vui123-agent-logo.png')}
                resizeMode="contain"
              />
            </BouncePressable>
          </View>
          <HeaderContentContainer>
            {data ? (
              <>
                <BalanceContainer>
                  <View sx={{ mr: '$3' }}>
                    <CurrencyText color={balanceColor}>VND</CurrencyText>
                    <BalanceText color={balanceColor}>
                      {toCurrency(balance?.toString() ?? 0, currency, {
                        hideTruncatedThousand: false,
                        forceDecimal: false,
                        symbol: false,
                      })}
                    </BalanceText>
                  </View>

                  <RefreshButton
                    containerStyle={{ mr: '$3' }}
                    loading={isLoading}
                    onPress={testActionWithTimeout}
                    size={20}
                  />
                </BalanceContainer>

                <TouchableOpacity
                  sx={{ flexDirection: 'column', alignItems: 'center' }}
                  onPress={() => {
                    push('/agent/profile')
                  }}
                >
                  <UserNameText>{userName}</UserNameText>
                  <RoleTextContainer isShareHolder={isShareHolder}>
                    <RoleText isShareHolder={isShareHolder}>
                      {t(`common.${role}`)}
                    </RoleText>
                  </RoleTextContainer>
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
              </>
            ) : (
              <ActivityIndicator
                color="white"
                size={'small'}
                sx={{ mr: '$4' }}
              />
            )}

            <MainMenu />

            {/* <BouncePressable
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
              <Icon name="menu" size={smallIconHeight} />
            </BouncePressable> */}
            {/* 
            <MainMenuTest
              isShow={showMenu}
              onMenu={(e) => {
                return setShowMenu(e)
              }}
              parentPosition={menuPosition}
            /> */}
          </HeaderContentContainer>
        </StyledContainer>
      </View>
    </View>
  )
}

const StyledContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  px: '$2',
})

const StyledLogo = styled(Image)({})

const StyledImg = styled(Image)({
  borderRadius: 24,
  borderWidth: 2,
  borderColor: 'white',
  mx: '$2',
})

const HeaderContentContainer = styled(View)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
})

const BalanceContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const CurrencyText = styled(Text)(({ color }: { color: ColorValue }) => ({
  color,
  textAlign: 'center',
  lineHeight: 20,
  fontSize: 14,
  fontWeight: 'bold',
}))

const BalanceText = styled(Text)(({ color }: { color: ColorValue }) => ({
  color,
  lineHeight: 20,
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'right',
}))

const UserNameText = styled(Text)({
  fontWeight: 'bold',
  fontSize: 12,
  my: 2,
  color: 'white',
})

const RoleTextContainer = styled(View)(
  ({ isShareHolder }: { isShareHolder: boolean }) => ({
    borderRadius: 10,
    my: 1,
    paddingX: isShareHolder ? 10 : 20,
    backgroundColor: isShareHolder ? '#ffd900' : '#d02fa9',
  })
)

const RoleText = styled(Text)(
  ({ isShareHolder }: { isShareHolder: boolean }) => ({
    color: isShareHolder ? '#000' : '#fff',
    fontSize: 10,
    py: '$1',
    fontStyle: 'italic',
  })
)

export default Header
