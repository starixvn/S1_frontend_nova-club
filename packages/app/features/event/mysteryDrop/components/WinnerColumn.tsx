import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const WinnerColumn = () => {
  const { t } = useLocalization()

  return (
    <View
      sx={{
        bg: 'rgba(50, 50, 90, 0.5)',
        borderRadius: 16,
        p: '$3',
        mb: '$4',
      }}
    >
      <View sx={{ alignItems: 'center', mb: '$3' }}>
        <Icon name="mystery-win" size={60} sx={{ mb: '$2' }} />
        <Text sx={{ fontWeight: 'bold' }}>{t('event.mystery.latestWins')}</Text>
      </View>

      <WinnerColumnContent />
    </View>
  )
}

export const DesktopWinnerColumn = () => {
  const { t } = useLocalization()

  return (
    <View
      sx={{
        bg: 'rgba(50, 50, 90, 0.5)',
        borderRadius: 16,
        p: '$3',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <View sx={{ alignItems: 'center', mb: '$3' }}>
        <Icon name="mystery-win" size={80} sx={{ mt: -50, mb: '$2' }} />
        <Text sx={{ fontWeight: 'bold' }}>{t('event.mystery.latestWins')}</Text>
      </View>

      <WinnerColumnContent />
    </View>
  )
}

const WinnerColumnContent = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <Row
          key={item}
          sx={{
            p: '$2',
            borderRadius: 8,
            justifyContent: 'space-between',
            bg: index % 2 === 0 ? '$primary.500' : 'transparent',
          }}
        >
          <Row>
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/ic-thropy.png`}
              width={24}
              height={24}
              alt=""
              style={{ marginHorizontal: 16 }}
            />
            <Text>xxxx</Text>
          </Row>
          <Text>VND 100,000</Text>
        </Row>
      ))}
    </>
  )
}

export default WinnerColumn
