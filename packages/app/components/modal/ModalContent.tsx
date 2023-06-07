import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { ScrollView, styled, Sx, Text, View } from 'dripsy'
import React, { ComponentProps } from 'react'
import { ModalComponentProp, ModalfyParams } from 'react-native-modalfy'
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
  headerStyle?: Sx
  closeModal: ModalComponentProp<ModalStackParams>['modal']['closeModal']
  closeIconProps?: ComponentProps<typeof IconButton>
}

const ModalContent = ({
  children,
  title,
  renderFooter,
  actions,
  _body,
  _footer,
  isShowHeader = true,
  hideCloseButton,
  closeModal,
  headerStyle,
  closeIconProps,
  ...modalProps
}: ModalProps) => {
  const { t } = useLocalization()

  return (
    <StyledViewModal {...modalProps}>
      {isShowHeader && (
        <StyledViewHeader>
          <StyledTextHeader sx={{ ...headerStyle }}>
            {t(title)}
          </StyledTextHeader>
          {!hideCloseButton && (
            <StyledViewClose>
              <IconButton
                name="cross"
                size={26}
                onPress={() => closeModal()}
                {...closeIconProps}
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
                    <Button.Label sx={{ color: 'white' }}>
                      {a.label}
                    </Button.Label>
                  </Button>
                ))
              ) : (
                <Button
                  onPress={() => {
                    closeModal()
                  }}
                >
                  <Button.Label>{t('common.close')}</Button.Label>
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
  bg: '$background',
  borderRadius: 12,
  borderColor: 'rgba(0, 0, 0, 0.1)',
  maxHeight: '100%',
  // flex: 1
}))
const StyledViewHeader = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  p: '$4',
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
  color: 'white',
}))
const StyledViewClose = styled(View)(() => ({
  position: 'absolute',
  right: '$3',
  top: '$3',
}))
const StyledViewButton = styled(View)(() => ({
  flexDirection: 'row',
  justifyContent: 'center',
}))

export default ModalContent
