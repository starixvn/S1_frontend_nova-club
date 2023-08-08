import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { Row, Text, useResponsiveValue } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const Powered = () => {
  const isDesktop = useResponsiveValue([false, false, false, true])
  const { t } = useLocalization()
  return (
    <Row
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        bg: isDesktop ? '$primary.500' : 'transparent',
      }}
    >
      <Text sx={{ mr: '$3' }}>{t('footer.power')}</Text>
      <SolitoImage
        width={100}
        height={60}
        contentFit="contain"
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/footer/bong88.png`}
        alt="PoweredBy"
      />
    </Row>
  )
}

export default Powered
