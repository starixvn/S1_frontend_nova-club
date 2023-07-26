import useLocalization from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const FONT_SIZE = 16
const NoticeModal = ({ modal: { closeModal, getParam } }) => {
  const notice = getParam('notice', [])
  const noticeModule = getParam('noticeModule', '')

  return (
    <ModalWrapper>
      <NoticeContent notice={notice} noticeModule={noticeModule} />
    </ModalWrapper>
  )
}

type NoticeContentProps = {
  notice: string[]
  noticeModule?: string
}

export const NoticeContent = ({ notice, noticeModule }: NoticeContentProps) => {
  const { t } = useLocalization()
  return (
    <ModalContent disableAction>
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
                <Text sx={{ fontSize: FONT_SIZE, mr: 12 }}>{i + 1 + '.'}</Text>
              )}
              <Text sx={{ fontSize: FONT_SIZE, flex: 1 }}>{t(content)}</Text>
            </View>
          )
        })}
      </View>
    </ModalContent>
  )
}

export default NoticeModal
