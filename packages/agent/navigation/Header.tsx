import HeaderDropdown from 'agent/components/HeaderDropdown'
import RefreshButton from 'agent/components/Icon/RefreshButton'
import { Options } from 'agent/components/Select/Select'
import Text from 'agent/components/Text'
import {
  useLazyUserRefreshBalanceQuery,
  useUserInfoQuery,
} from 'agent/services/userApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import { ROLE } from 'agent/utils/helper'
import BouncePressable from 'app/components/pressable/BouncePressable'
import TouchableOpacity from 'app/components/pressable/TouchableOpacity'
import { useAgentLocalization } from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { toCurrency } from 'app/utils'
import { ActivityIndicator, Image, Row, View, styled, useSx } from 'dripsy'
import { useMemo, useState } from 'react'
import { ColorValue } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import { Currency, LANGUAGE_CODE } from 'utils/constant'
import { AGENT_TAB_HEIGHT } from '../constant/sizes'
import MainMenu from './MainMenu'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

const EmptySelection = [] as Options<Currency>[]

const iconHeight = AGENT_TAB_HEIGHT * 0.6
const smallIconHeight = AGENT_TAB_HEIGHT * 0.4

const Header = () => {
  const dispatch = useDispatch()
  const lang = useAppSelector((state) => state.setting?.locale)
  const currency = useAppSelector((state) => state.agent?.currency)
  const [isLoading, setIsLoading] = useState(false)
  const { top, left, right } = useSafeArea()
  const sx = useSx()
  const { push } = useRouter()
  const { t } = useAgentLocalization()
  const token = useAppSelector((s) => s.agent.access_token)

  const { balance, role, userName, data } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      userName: data?.username,
      balance: data?.allWallet[currency] ?? 0,
      role: data?.role,
      data,
    }),
    skip: !token,
  })

  const currencyOptions = useMemo(() => {
    if (!data) return EmptySelection
    else {
      return Object.keys(data.allWallet).map((k) => ({
        label: k,
        value: k,
      })) as Options<Currency>[]
    }
  }, [data])

  //get user info here
  const isAgent = role === ROLE.AGENT
  const balanceColor =
    balance === 0 ? 'white' : balance < 0 ? '#ff2736' : '#00ECA4'
  const [getBalance] = useLazyUserRefreshBalanceQuery()

  const headerHeight = AGENT_TAB_HEIGHT

  async function testActionWithTimeout() {
    setIsLoading(true)
    const data = await getBalance(currency).unwrap()
    setTimeout(() => setIsLoading(false), 1500)
  }

  const countryImg = {
    [LANGUAGE_CODE.ENGLISH]: `${MEDIA_DOMAIN}${CONTENT_URI}/language/en.jpg`,
    [LANGUAGE_CODE.VIETNAM]: `${MEDIA_DOMAIN}${CONTENT_URI}/language/vn.jpg`,
    [LANGUAGE_CODE.THAILAND]: `${MEDIA_DOMAIN}${CONTENT_URI}/language/th.jpg`,
  }

  const onChangeLanguage = (value: LANGUAGE_CODE) => {
    dispatch(SettingActions.setLocale(value))
  }

  return (
    <View sx={{ bg: '#004fd0', pt: top, pl: left, pr: right }}>
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
              <BalanceContainer sx={{ mr: '$3' }}>
                <View sx={{ mr: '$1' }}>
                  {currencyOptions.length > 1 ? (
                    <HeaderDropdown
                      options={currencyOptions}
                      value={currency}
                      onChange={(c) =>
                        dispatch(AgentAuthActions.setAgentCurrency(c))
                      }
                      labelSx={{ color: balanceColor }}
                    />
                  ) : (
                    <CurrencyText color={balanceColor}>{currency}</CurrencyText>
                  )}
                  <Row
                    sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
                  >
                    <RefreshButton
                      loading={isLoading}
                      onPress={testActionWithTimeout}
                      size={20}
                    />
                    <BalanceText color={balanceColor}>
                      {toCurrency(balance?.toString() ?? 0, currency, {
                        hideTruncatedThousand: false,
                        forceDecimal: false,
                        symbol: false,
                      })}
                    </BalanceText>
                  </Row>
                </View>
              </BalanceContainer>

              <TouchableOpacity
                sx={{ flexDirection: 'column', alignItems: 'center' }}
                onPress={() => {
                  push('/agent/profile')
                }}
              >
                <UserNameText>{userName}</UserNameText>
                <RoleTextContainer isAgent={isAgent}>
                  <RoleText isAgent={isAgent}>{t(`common.${role}`)}</RoleText>
                </RoleTextContainer>
              </TouchableOpacity>

              <View>
                <BouncePressable
                  onPress={() =>
                    onChangeLanguage(
                      {
                        [LANGUAGE_CODE.ENGLISH]:
                          currency === Currency.THB
                            ? LANGUAGE_CODE.THAILAND
                            : LANGUAGE_CODE.VIETNAM,
                        [LANGUAGE_CODE.THAILAND]: LANGUAGE_CODE.ENGLISH,
                        [LANGUAGE_CODE.VIETNAM]: LANGUAGE_CODE.ENGLISH,
                      }[lang]
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
            <ActivityIndicator color="white" size={'small'} sx={{ mr: '$4' }} />
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
  fontWeight: 'bold',
}))

const BalanceText = styled(Text)(({ color }: { color: ColorValue }) => ({
  color,
  lineHeight: 20,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'right',
}))

const UserNameText = styled(Text)({
  fontWeight: 'bold',
  fontSize: 12,
  my: 2,
  color: 'white',
})

const RoleTextContainer = styled(View)(({ isAgent }: { isAgent: boolean }) => ({
  borderRadius: 10,
  my: 1,
  paddingX: isAgent ? 20 : 10,
  backgroundColor: isAgent ? '#d02fa9' : '#ffd900',
}))

const RoleText = styled(Text)(({ isAgent }: { isAgent: boolean }) => ({
  color: isAgent ? '#fff' : '#000',
  fontSize: 10,
  py: '$1',
  fontStyle: 'italic',
}))

export default Header
