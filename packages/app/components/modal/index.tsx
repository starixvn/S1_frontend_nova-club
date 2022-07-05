import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React, { ComponentProps, FC } from 'react'
import ReactNativeModal from 'react-native-modal'
import { Button } from '../form/Button'
import IconButton from '../form/IconButton'
import { ModalAction } from './Modal.type'
import ModalContent from './ModalContent'

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
  closeModal?: () => void
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
  const { t } = useLocalization()

  return (
    <ReactNativeModal
      backdropColor="black"
      backdropOpacity={0.7}
      {...modalProps}
    >
      <ModalContent
        title={title}
        closeModal={modalProps.onModalHide}
        _body={_body}
        _footer={_footer}
        renderFooter={renderFooter}
        actions={actions}
        isShowHeader={isShowHeader}
        hideCloseButton={hideCloseButton}
      >
        {children}
      </ModalContent>
      {/*
      <StyledViewModal>
        {isShowHeader && (
          <StyledViewHeader>
            <StyledTextHeader>{t(title)}</StyledTextHeader>
            {!hideCloseButton && (
              <StyledViewClose>
                <IconButton
                  name="cross"
                  size={26}
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
                    containerStyle={{ ml: '$3' }}
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
                */}
    </ReactNativeModal>
  )
}

const StyledViewModal = styled(View)(() => ({
  bg: '$background',
  borderRadius: 12,
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
  right: '$3',
  top: '$3',
}))
const StyledViewButton = styled(View)(() => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
}))

export default Modal
