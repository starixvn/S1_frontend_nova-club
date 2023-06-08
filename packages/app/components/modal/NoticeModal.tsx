import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const FONT_SIZE = 16
const NoticeModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const notice = getParam('notice', [])
  const noticeModule = getParam('noticeModule', '')

  return (
    <ModalWrapper>
      <ModalContent>
        <View>
          {notice.map((content, i) => {
            const _content = content
            const parts = _content.split('|')
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
                <Text sx={{ fontSize: FONT_SIZE, flex: 1 }}>{content}</Text>

                {/* <Text sx={{ textAlign: 'center', lineHeight: 20 }}>
                  {parts.map((part, index) =>
                    index % 2 === 0 ? (
                      <Text sx={{ fontSize: FONT_SIZE }} key={index}>
                        {part}
                      </Text>
                    ) : (
                      <Text
                        key={index}
                        sx={{ fontWeight: 'bold', fontSize: FONT_SIZE }}
                      >
                        {part}
                      </Text>
                    )
                  )}
                </Text> */}
              </View>
            )
          })}
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

export default NoticeModal
