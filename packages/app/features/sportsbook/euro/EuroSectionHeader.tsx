import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Row, Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const EuroSectionHeader = () => {
  const { t } = useLocalization()

  return (
    <Row
      sx={{
        bg: '$primaryEuro.700',
        p: '$2',
        px: '$3',
        alignItems: 'center',
        gap: '$2',
        mr: 'auto',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        borderTopWidth: 1,
        borderColor: 'white',
      }}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/euro-cup-icon.png`}
        width={28}
        height={28}
        alt=""
      />
      <Text sx={{ fontWeight: 'bold' }}>{t('event.euro.sportsbook.eufa')}</Text>
    </Row>
  )
}

export default EuroSectionHeader
