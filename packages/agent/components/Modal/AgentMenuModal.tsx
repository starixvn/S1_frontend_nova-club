import { StyleMenuText, StyledMenuWrapList } from 'agent/navigation/MainMenu'
import { ModalStackParams } from 'agent/provider/agentModal'
import { useAgentLocalization } from 'app/provider/localization'
import { View } from 'dripsy'
import React from 'react'
import { ModalComponentProp } from 'react-native-modalfy'
import Icon from '../Icon'

type AgentModalProps = ModalComponentProp<
  ModalStackParams,
  void,
  'AgentMenuModal'
>
const AgentMenuModal = ({
  modal: { closeModal, getParam },
}: AgentModalProps) => {
  const { t } = useAgentLocalization()

  const mainMenuList = getParam('mainMenuList', [])

  const onSelectMenuItem = (item: (typeof mainMenuList)[number]) => {
    closeModal()
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
    <View
      sx={{
        bg: 'rgba(255,255,255,0.8)',
        borderTopLeftRadius: 20,
        paddingTop: 12,
        borderWidth: 0,
      }}
    >
      {mainMenuList.map((i, index) => {
        const lastItem = index === mainMenuList.length - 1
        const isSwitchAcc = index === mainMenuList.length - 2

        return (
          <StyledMenuWrapList key={i.label} onPress={() => onSelectMenuItem(i)}>
            <Icon name={i.icon} size={23} color={lastItem ? 'red' : 'black'} />
            <StyleMenuText sx={{ color: lastItem ? 'red' : 'black' }}>
              {t(i.label)}
            </StyleMenuText>
          </StyledMenuWrapList>
        )
      })}
    </View>
  )
}

export default AgentMenuModal
