import { styled, Text, View } from 'dripsy'
import React, { ComponentProps, FC } from 'react'
import ReactNativeModal from 'react-native-modal'
import { Button } from '../form/Button'
import IconButton from '../form/IconButton'
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
  closeModal: () => void
} & ComponentProps<typeof ReactNativeModal>

const Modal = ({
  children,
  title,
  renderFooter,
  actions,
  _body,
  _footer,
  isShowHeader = true,
  hideCloseButton,
  closeModal,
  ...modalProps
}: ModalProps) => {
  return (
    <ReactNativeModal
      backdropColor="black"
      backdropOpacity={0.7}
      {...modalProps}
    >
      <StyledViewModal>
        {isShowHeader && (
          <StyledViewHeader>
            <StyledTextHeader>Alert</StyledTextHeader>
            {!hideCloseButton && (
              <StyledViewClose>
                <IconButton
                  name="cross"
                  size={36}
                  onPress={() => modalProps.onModalHide()}
                />
              </StyledViewClose>
            )}
          </StyledViewHeader>
        )}
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
                      if (!a.disableAutoClose && modalProps.onModalHide)
                        modalProps.onModalHide()

                      a.onPress && a.onPress()
                    }}
                    {...a.props}
                  >
                    <Button.Label>{a.label}</Button.Label>
                  </Button>
                ))
              ) : (
                <Button
                  onPress={() => {
                    modalProps.onModalHide()
                  }}
                >
                  <Button.Label>Close</Button.Label>
                </Button>
              )}
            </StyledViewButton>
          )}
        </StyledViewFooter>
      </StyledViewModal>
    </ReactNativeModal>
  )
}

const StyledViewModal = styled(View)(() => ({
  bg: '$background',
  borderRadius: 4,
  borderColor: 'rgba(0, 0, 0, 0.1)',
}))
const StyledViewHeader = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  p: '$4',
}))
const StyledViewBody = styled(View)(() => ({
  padding: '$4',
  minHeight: 120,
}))
const StyledViewFooter = styled(View)(() => ({
  padding: '$4',
}))

const StyledTextHeader = styled(Text)(() => ({
  flex: 1,
  textAlign: 'center',
}))
const StyledViewClose = styled(View)(() => ({
  position: 'absolute',
  right: '$2',
  top: '$2',
}))
const StyledViewButton = styled(View)(() => ({
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'center',
}))

export default Modal
