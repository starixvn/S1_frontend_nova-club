import useLocalization from 'app/provider/localization'
import { SxProp, Text, View } from 'dripsy'
import React, { ComponentProps } from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'

const FONT_SIZE = 16
const NoticeModal = ({ modal: { closeModal, getParam } }) => {
  const notice = getParam('notice', [])
  const noticeModule = getParam('noticeModule', '')
  const title = getParam('title')

  return (
    <ModalWrapper>
      <NoticeContent
        notice={notice}
        noticeModule={noticeModule}
        title={title}
      />
    </ModalWrapper>
  )
}

type NoticeContentProps = {
  notice: string[]
  noticeModule?: string
} & Omit<ComponentProps<typeof ModalContent>, 'children'>

export const NoticeContent = ({
  notice,
  noticeModule,
  ...rest
}: NoticeContentProps) => {
  const { t } = useLocalization()
  return (
    <ModalContent disableAction {...rest}>
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
