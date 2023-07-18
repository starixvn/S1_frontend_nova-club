import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import { AGENT_TAB_HEIGHT } from 'agent/constant/sizes'
import useOnAgentLogout from 'agent/hooks/useOnAgentLogout'
import { useUserInfoQuery } from 'agent/services/userApi'
import { useAgentLocalization } from 'app/provider/localization'
import { styled, Sx, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
import * as DropdownMenu from 'zeego/dropdown-menu'

const smallIconHeight = AGENT_TAB_HEIGHT * 0.5
interface MainMenuTestProps {
  isShow: boolean
  onMenu: (...args: any[]) => any
  parentPosition: { x: Sx['width']; y: Sx['height'] }
}

const MainMenu = () => {
  const { t } = useAgentLocalization()
  const { logout } = useOnAgentLogout()
  const { push } = useRouter()
  const { openModal } = useModal()

  const { hasPin } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      hasPin: data?.has_pin,
    }),
  })

  function AgentSwitchConfirmation() {
    openModal('AgentSwitchConfirmationModal', {
      onConfirm: () => push('/'),
    })
  }
  const mainMenuList = [
    {
      label: 'commission.title',
      icon: 'table',
      onPress: () => {
        push('/agent/commission-table')
      },
    },
    // {
    //   label: 'menu.desktopVersion',
    //   icon: 'desktop',
    //   onPress: () => {
    //     Linking.openURL(AGENT_URL)
    //   },
    // },
    {
      label: hasPin ? 'menu.resetPin' : 'pin.createPin',
      icon: 'change-pin',
      onPress: () =>
        hasPin ? push('/agent/reset-pin') : push('/agent/create-pin'),
    },
    {
      label: 'menu.changePass',
      icon: 'password',
      onPress: () => push('/agent/change-password'),
    },
    {
      label: 'menu.switchMember',
      icon: 'switch',
      onPress: () => AgentSwitchConfirmation(),
    },
    {
      label: 'menu.logout',
      icon: 'logout',
      onPress: logout,
    },
  ]

  const onSelectMenuItem = (item: (typeof mainMenuList)[number]) => {
    item.onPress && item.onPress()

    /**
     * Only mobile app need to close the menu manually.
     * For website, due to navigation to other page will unmount current page,
     * so `handleDismiss` update state after page unmounted will trigger error.
     */
    // if (Platform.OS === 'android' || Platform.OS === 'ios') {
    //   handleDismiss()
    // }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity>
          <Icon name="menu" size={smallIconHeight} />
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        alignOffset={-12}
        side="top"
        sideOffset={16}
      >
        <StyledContainer>
          {/* <View sx={{ height: 12 }} /> */}
          {mainMenuList.map((i, index) => {
            const lastItem = index === mainMenuList.length - 1
            const isSwitchAcc = index === mainMenuList.length - 2
            return (
              <StyledWrapList onPress={() => onSelectMenuItem(i)} key={i.label}>
                <Icon
                  name={i.icon}
                  size={23}
                  color={lastItem ? 'red' : 'black'}
                />
                <StyleText sx={{ color: lastItem ? 'red' : 'black' }}>
                  {t(i.label)}
                </StyleText>
              </StyledWrapList>
            )
          })}
        </StyledContainer>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const StyledContainer = styled(View)({
  bg: 'rgba(255,255,255,0.8)',
  borderTopLeftRadius: 20,
  // zIndex: 1,
  // pt: '$2',
  // mt: '$2',
})

const StyledWrapList = styled(TouchableOpacity)({
  flexDirection: 'row',
  px: '$3',
  py: '$1',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const StyleText = styled(Text)({
  fontSize: 16,
  // color: '$textAgent',
  ml: '$5',
})

export default MainMenu
