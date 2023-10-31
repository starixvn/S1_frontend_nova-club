import { Text, View, styled } from 'dripsy'
import React from 'react'
import ModalContent from './ModalContent'
import ModalWrapper from './ModalWrapper'
import dayjs from 'dayjs'
import Divider from '../Divider'
import useLocalization from 'app/provider/localization'

const NotesModal = ({ modal: { closeModal, getParam } }) => {
  const { t } = useLocalization()
  const id = getParam('id', 0)
  const data = getParam('data', [])

  return (
    <ModalWrapper>
      <ModalContent title={`ID: ${id}`} close={closeModal}>
        <View sx={{ maxHeight: 600 }}>
          {data.map((item, index) => (
            <View key={index}>
              <View sx={{ p: '$2' }}>
                <TextTitle>
                  {dayjs(item.created_at).format('DD-MM-YYYY hh:mm:ss A')}
                </TextTitle>
                <TextContent>{item.message}</TextContent>
              </View>
            </View>
          ))}
        </View>
      </ModalContent>
    </ModalWrapper>
  )
}

const TextTitle = styled(Text)({
  fontWeight: 'bold',
})
const TextContent = styled(Text)({})

export default NotesModal
