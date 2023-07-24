import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import { AGENT_TAB_HEIGHT } from 'agent/constant/sizes'
import useOnAgentLogout from 'agent/hooks/useOnAgentLogout'
import { useUserInfoQuery } from 'agent/services/userApi'
import { useAgentLocalization } from 'app/provider/localization'
import { styled, Sx, View } from 'dripsy'
import { Linking, Platform, TouchableOpacity } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'
// import * as DropdownMenu from 'zeego/dropdown-menu'
import { DropdownMenu } from 'agent/components/Dropdown'
import useSupportItemList from 'app/features/customerSupport/useSupportItemList'

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
  const mediaList = useSupportItemList()

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

  return Platform.OS === 'web' ? (
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
        sideOffset={20}
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderTopLeftRadius: 20,
          paddingTop: 12,
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
            >
              <Icon
                name={i.icon}
                size={23}
                color={lastItem ? 'red' : 'black'}
              />
              <StyleMenuText sx={{ color: lastItem ? 'red' : 'black' }}>
                {t(i.label)}
              </StyleMenuText>
            </StyledMenuWrapList>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ) : (
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
  /* <DropdownMenu.Item key={i.label} textValue={i.label}>
<StyledMenuWrapList onPress={() => onSelectMenuItem(i)}>
  <Icon
    name={i.icon}
    size={23}
    color={lastItem ? 'red' : 'black'}
  />
  <StyleMenuText sx={{ color: lastItem ? 'red' : 'black' }}>
    {t(i.label)}
  </StyleMenuText>
</StyledMenuWrapList>
</DropdownMenu.Item> */
}
// {mainMenuList.map((i, index) => {
//   const lastItem = index === mainMenuList.length - 1
//   const isSwitchAcc = index === mainMenuList.length - 2
//   return (
//     <DropdownMenu.Item
//       key={i.label}
//       textValue={i.label}
//       onSelect={() => onSelectMenuItem(i)}
//       style={{
//         flexDirection: 'row',
//         paddingHorizontal: '$3',
//         paddingVertical: '$1',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <DropdownMenu.ItemIcon>
//         <Icon
//           name={i.icon}
//           size={23}
//           color={lastItem ? 'red' : 'black'}
//         />
//       </DropdownMenu.ItemIcon>
//       <DropdownMenu.ItemTitle
//         style={{
//           fontSize: 16,
//           color: lastItem ? 'red' : 'black',
//         }}
//       >
//         {t(i.label)}
//       </DropdownMenu.ItemTitle>
//     </DropdownMenu.Item>
//   )
// })}
export const StyledMenuWrapList = styled(TouchableOpacity)({
  flexDirection: 'row',
  px: '$3',
  py: '$1',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const StyleMenuText = styled(Text)({
  fontSize: 16,
  ml: '$5',
})

export default MainMenu
