import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const FONT_SIZE = 13
const NoticeModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()

  const notice = getParam('notice', [])
  const noticeModule = getParam('noticeModule', '')

  function onDismiss() {
    closeModal()
  }

  return (
    <ModalWrapper>
      <ModalContent
        title={t('notes.importantNotice')}
        closeModal={closeModal}
        hideCloseButton
        actions={[
          {
            label: t('common.close'),
            onPress: onDismiss,
          },
        ]}
      >
        <View>
          {notice.map((content, i) => {
            return (
              <View
                key={`${noticeModule}.row${i}`}
                sx={{ flexDirection: 'row', mb: '$1' }}
              >
                {noticeModule !== 'Rewards' && (
                  <Text sx={{ fontSize: FONT_SIZE, mr: 12 }}>
                    {i + 1 + '.'}
                  </Text>
                )}
                <Text sx={{ fontSize: FONT_SIZE, flex: 1 }}>{t(content)}</Text>
              </View>
            )
          })}
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default NoticeModal
