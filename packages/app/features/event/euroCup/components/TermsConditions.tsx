import useLocalization from 'app/provider/localization'
import { Row, Text, View, styled } from 'dripsy'
import React from 'react'

const TNC = [
  'event.euro.tnc.n1',
  'event.euro.tnc.n2',
  'event.euro.tnc.n3',
  'event.euro.tnc.n4',
  'event.euro.tnc.n5',
  'event.euro.tnc.n6',
  'event.euro.tnc.n7',
  'event.euro.tnc.n8',
  'event.euro.tnc.n9',
  'event.euro.tnc.n10',
  'event.euro.tnc.n11',
  'event.euro.tnc.n12',
  'event.euro.tnc.n13',
  'event.euro.tnc.n14',
]

const TermsConditions = () => {
  const { t } = useLocalization()

  return (
    <View sx={{ py: '$2' }}>
      <Text sx={{ fontWeight: 'bold' }}>{t('common.tnc')}</Text>
      {TNC.map((item, index) => {
        return (
          <Row key={index} sx={{ mb: '$1' }}>
            <NoteText sx={{ flex: 0.1, textAlign: 'center' }}>{`${
              index + 1
            }`}</NoteText>
            <NoteText sx={{ flex: 0.9 }}>{t(item)}</NoteText>
          </Row>
        )
      })}
    </View>
  )
}

const NoteText = styled(Text)({ fontSize: 14 })

export default TermsConditions
