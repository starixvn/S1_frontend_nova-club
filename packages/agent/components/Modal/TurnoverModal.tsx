import { useAgentLocalization } from 'app/provider/localization'
import { TURNOVER_NOTES } from 'app/utils/constant'
import { Text, View } from 'dripsy'
import React from 'react'
import ModalWrapper from './ModalWrapper'

const FONT_SIZE = 14
const TurnoverModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useAgentLocalization()

  function onDismiss() {
    closeModal()
  }

  return (
    <ModalWrapper title={t('notes.importantNotice')} onClose={onDismiss}>
      <View sx={{ p: '$3' }}>
        {TURNOVER_NOTES.map((content, i) => {
          return (
            <Text
              key={`Turnover ${i}`}
              sx={{
                fontSize: FONT_SIZE,
                color: i === 2 ? 'red' : 'black',
                mb: '$2',
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
