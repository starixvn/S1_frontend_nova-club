import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import { AGENT_TAB_HEIGHT } from 'agent/constant/sizes'
import useOnAgentLogout from 'agent/hooks/useOnAgentLogout'
import { useUserInfoQuery } from 'agent/services/userApi'
import { useAgentLocalization } from 'app/provider/localization'
import { styled, Sx } from 'dripsy'
import { Linking, TouchableOpacity } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
// import * as DropdownMenu from 'zeego/dropdown-menu'
import useSupportItemList from 'app/features/customerSupport/useSupportItemList'
import { modalDelaySubmission } from 'utils/common'
import { MODAL_ANIMATION_DELAY } from 'app/provider/modal'

const smallIconHeight = AGENT_TAB_HEIGHT * 0.4
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
  const mediaList = useSupportItemList()

  const { hasPin } = useUserInfoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      hasPin: data?.has_pin,
    }),
  })

  function AgentSwitchConfirmation() {
    setTimeout(() => {
      openModal('AgentSwitchConfirmationModal', {
        onConfirm: () => push('/'),
      })
    }, MODAL_ANIMATION_DELAY)
  }

  const OpenCSTelegram = () => {
    mediaList.length > 0 && Linking.openURL(mediaList[0]?.href ?? '')
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
      label: 'menu.contactUs',
      icon: 'cs',
      onPress: () => OpenCSTelegram(),
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
    <TouchableOpacity
      onPress={() =>
        openModal('AgentMenuModal', { mainMenuList: mainMenuList })
      }
    >
      <Icon name="menu" size={smallIconHeight} />
    </TouchableOpacity>
  )
}

{
  /* <DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <TouchableOpacity>
      <Icon name="menu" size={smallIconHeight} />
    </TouchableOpacity>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content
    align="end"
    alignOffset={-12}
    side="top"
    sideOffset={20}
    style={{
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderTopLeftRadius: 20,
      // paddingTop: 12,
      borderWidth: 0,
    }}
  >
    {mainMenuList.map((i, index) => {
      const lastItem = index === mainMenuList.length - 1
      const isSwitchAcc = index === mainMenuList.length - 2

      return (
        <StyledMenuWrapList
          key={i.label}
          onPress={() => onSelectMenuItem(i)}
          hitSlop={{ top: -20, bottom: -20, left: 50, right: 50 }}
        >
          <Icon name={i.icon} size={23} color={lastItem ? 'red' : 'black'} />
          <StyleMenuText sx={{ color: lastItem ? 'red' : 'black' }}>
            {t(i.label)}
          </StyleMenuText>
        </StyledMenuWrapList>
      )
    })}
  </DropdownMenu.Content>
</DropdownMenu.Root> */
}

export const StyledMenuWrapList = styled(TouchableOpacity)({
  flexDirection: 'row',
  px: '$3',
  my: '$1',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const StyleMenuText = styled(Text)({
  fontSize: 16,
  ml: '$5',
})

export default MainMenu
