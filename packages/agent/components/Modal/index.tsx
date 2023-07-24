// import Text from 'agent/components/Text'
// import { useAgentLocalization } from 'app/provider/localization'
// import { styled, View } from 'dripsy'
// import React, { ComponentProps } from 'react'
// import ReactNativeModal from 'react-native-modal'
// import { ModalAction } from './Modal.type'
// import ModalContent from './ModalContent'

// type DripsyViewProps = React.ComponentProps<typeof View>

// type ModalProps = {
//   children?: React.ReactNode
//   title?: string
//   renderFooter?: React.FC
//   actions?: ModalAction[]
//   _body?: DripsyViewProps
//   _footer?: DripsyViewProps
//   isShowHeader?: boolean
//   hideCloseButton?: boolean
//   closeModal?: () => void
// } & ComponentProps<typeof ReactNativeModal>

// const Modal = ({
//   children,
//   title,
//   renderFooter,
//   actions,
//   _body,
//   _footer,
//   isShowHeader = true,
//   hideCloseButton,
//   onModalHide,
//   ...modalProps
// }: ModalProps) => {
//   const { t } = useAgentLocalization()

//   /*
//     this is a replacement for the modalfy closeModal,
//     this component is deprecated
//   */
//   function _closeModal(_, callback) {
//     onModalHide && onModalHide()
//     callback && callback()
//   }

//   return (
//     <ReactNativeModal
//       backdropColor="black"
//       backdropOpacity={0.7}
//       {...modalProps}
//     >
//       <ModalContent
//         title={title}
//         closeModal={_closeModal}
//         _body={_body}
//         _footer={_footer}
//         renderFooter={renderFooter}
//         actions={actions}
//         isShowHeader={isShowHeader}
//         hideCloseButton={hideCloseButton}
//       >
//         {children}
//       </ModalContent>
//     </ReactNativeModal>
//   )
// }

// const StyledViewModal = styled(View)(() => ({
//   bg: '$background',
//   borderRadius: 12,
//   borderColor: 'rgba(0, 0, 0, 0.1)',
// }))
// const StyledViewHeader = styled(View)(() => ({
//   flexDirection: 'row',
//   alignItems: 'center',
//   p: '$4',
// }))
// const StyledViewBody = styled(View)(() => ({
//   padding: '$4',
//   minHeight: 120,
// }))
// const StyledViewFooter = styled(View)(() => ({
//   padding: '$4',
// }))

// const StyledTextHeader = styled(Text)(() => ({
//   flex: 1,
//   textAlign: 'center',
// }))
// const StyledViewClose = styled(View)(() => ({
//   position: 'absolute',
//   right: '$3',
//   top: '$3',
// }))
// const StyledViewButton = styled(View)(() => ({
//   flexDirection: 'row',
//   justifyContent: 'flex-end',
// }))

// export default Modal
