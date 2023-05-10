import { TURNOVER_NOTES } from 'app/constant/notes'
import { useAgentLocalization } from 'app/provider/localization'
import { Text, View } from 'dripsy'
import React from 'react'
import ModalWrapper from './ModalWrapper'

const FONT_SIZE = 13
const TurnoverModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentLocalization()

  function onDismiss() {
    closeModal()
  }

  return (
    <ModalWrapper title={t('notes.importantNotice')} onClose={onDismiss}>
      <View>
        {TURNOVER_NOTES.map((content, i) => {
          return (
            <Text
              key={`Turnover ${i}`}
              sx={{
                fontSize: FONT_SIZE,
                color: i === 2 ? 'red' : 'black',
              }}
            >
              {t(content)}
            </Text>
          )
        })}
      </View>
    </ModalWrapper>
  )
}

export default TurnoverModal
