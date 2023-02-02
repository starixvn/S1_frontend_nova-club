import Text from 'agent/components/Text'
import { useAgentTranslation } from 'app/provider/localization'
import { Image, styled, View } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const AgentCommonConfirmationModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentTranslation()

  const info = getParam('info', '')
  const bankLogo = getParam('bankLogo', '')
  const close = getParam('close', true)

  const fields = getParam('fields', '')
  const onConfirm = getParam('onConfirm')
  const title = getParam('title', '')
  const body = getParam('body', '')

  const isShowingFields = info && fields

  function onDismiss() {
    closeModal()
  }

  function onConfirmed() {
    close && onDismiss()
    onConfirm && onConfirm()
  }

  return (
    <ModalWrapper title={t(title)} onClose={closeModal}>
      <ModalContent
        closeModal={closeModal}
        actions={[
          {
            label: t('common.cancel'),
            onPress: onDismiss,
          },
          {
            label: t('common.submit'),
            onPress: onConfirmed,
          },
        ]}
      >
        {bankLogo ? (
          <BankImageContainer>
            <BankImage
              source={
                typeof bankLogo === 'string'
                  ? {
                      uri: bankLogo,
                    }
                  : bankLogo
              }
              resizeMode={'contain'}
            />
          </BankImageContainer>
        ) : null}

        {isShowingFields
          ? fields.map((field) => {
              return (
                <ConfirmationDetailsContainer key={field.value?.toString()}>
                  <View sx={{ flex: 0.5 }}>
                    <TextLabel>{t(field.label?.toString())} :</TextLabel>
                  </View>
                  <View sx={{ flex: 0.1 }} />
                  <View sx={{ flex: 0.3 }}>
                    <TextDetails>
                      {info[field.value]?.toString() ?? ''}
                    </TextDetails>
                  </View>
                </ConfirmationDetailsContainer>
              )
            })
          : null}

        {body ? (
          <View sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>{t(body)}</Text>
          </View>
        ) : null}
      </ModalContent>
    </ModalWrapper>
  )
}

const BankImageContainer = styled(View)({
  alignItems: 'center',
  paddingBottom: '$5',
  paddingTop: '$2',
})

const BankImage = styled(Image)({
  mx: '$2',
  width: 100,
  height: 100,
  bg: 'red',
  borderRadius: 15,
  borderColor: '#0c7dff',
  borderWidth: 2,
})

const ConfirmationDetailsContainer = styled(View)({
  p: '$2',
  flexDirection: 'row',
})

const TextLabel = styled(Text)({
  fontWeight: 'bold',
  color: 'black',
  textAlign: 'right',
})

const TextDetails = styled(Text)({
  color: 'black',
  textAlign: 'left',
})

export default AgentCommonConfirmationModal
