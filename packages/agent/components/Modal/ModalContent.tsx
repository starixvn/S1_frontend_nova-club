import Text from 'agent/components/Text'
import { useAgentLocalization } from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { ScrollView, styled, Sx, View } from 'dripsy'
import React from 'react'
import { ModalComponentProp } from 'react-native-modalfy'
import Button from '../Button'
import IconButton from '../Icon/IconButton'
import { ModalAction } from './Modal.type'

type DripsyViewProps = React.ComponentProps<typeof View>

type ModalProps = {
  children?: React.ReactNode
  title?: string
  renderFooter?: React.FC
  actions?: ModalAction[]
  _body?: DripsyViewProps
  _footer?: DripsyViewProps
  isShowHeader?: boolean
  hideCloseButton?: boolean
  headerStyle?: Sx
  closeModal: ModalComponentProp<ModalStackParams>['modal']['closeModal']
}

const ModalContent = ({
  children,
  title,
  renderFooter,
  actions,
  _body,
  _footer,
  isShowHeader = false,
  hideCloseButton = false,
  closeModal,
  headerStyle,
  ...modalProps
}: ModalProps) => {
  const { t } = useAgentLocalization()
  return (
    <StyledViewModal {...modalProps}>
      {isShowHeader && (
        <StyledViewHeader>
          <StyledTextHeader sx={{ ...headerStyle }}>{title}</StyledTextHeader>
          {hideCloseButton && (
            <StyledViewClose>
              <IconButton
                name="add"
                size={20}
                color={'#4e4f50'}
                onPress={() => closeModal()}
                sx={{ transform: [{ rotateZ: '45deg' }] }}
              />
            </StyledViewClose>
          )}
        </StyledViewHeader>
      )}
      <ScrollView>
        <StyledViewBody {..._body}>{children}</StyledViewBody>
        <StyledViewFooter {..._footer}>
          {renderFooter ? (
            renderFooter({})
          ) : (
            <StyledViewButton>
              {actions ? (
                actions.map((a) => (
                  <Button
                    disabled={a.disabled ?? false}
                    loading={a.loading}
                    key={a.label}
                    onPress={() => {
                      if (!a.disableAutoClose && closeModal)
                        closeModal(undefined, () => a.onPress && a.onPress())
                      else {
                        a.onPress && a.onPress()
                      }
                    }}
                    containerStyle={{ mx: '$1', ...a?.buttonStyle }}
                    {...a.props}
                  >
                    <Text sx={{ color: 'white' }}>{a.label}</Text>
                  </Button>
                ))
              ) : (
                <Button
                  onPress={() => {
                    closeModal()
                  }}
                >
                  <Text sx={{ color: 'white' }}>{t('common.close')}</Text>
                </Button>
              )}
            </StyledViewButton>
          )}
        </StyledViewFooter>
      </ScrollView>
    </StyledViewModal>
  )
}

const StyledViewModal = styled(View)(() => ({
  bg: 'white',
  borderRadius: 12,
  borderColor: 'rgba(0, 0, 0, 0.1)',
  maxHeight: '100%',
  // flex: 1
}))
const StyledViewHeader = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  p: '$4',
  borderBottomWidth: 1,
  borderColor: '#AEAFAF',
  bg: '#D1D1D1',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
}))
const StyledViewBody = styled(View)(() => ({
  padding: '$4',
  minHeight: 120,
  color: 'white',
}))
const StyledViewFooter = styled(View)(() => ({
  padding: '$4',
}))

const StyledTextHeader = styled(Text)(() => ({
  flex: 1,
  fontSize: 20,
  textAlign: 'center',
}))
const StyledViewClose = styled(View)(() => ({
  position: 'absolute',
  right: '$3',
  top: '$4',
}))
const StyledViewButton = styled(View)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-around',
  pb: '$5',
}))

export default ModalContent
