import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useIsDesktop from 'app/hooks/useIsDesktop'
import usePathname from 'app/hooks/usePathname'
import useLocalization from 'app/provider/localization'
import { ScrollView } from 'dripsy'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { SolitoImage } from 'solito/image'

const EuroBackground = ({ children }) => {
  const { t } = useLocalization()
  const { width, height } = useWindowDimensions()
  const isDesktop = useIsDesktop()
  const pathname = usePathname()

  return (
    <PageWithBackHeader
      header={{ title: t('event.euro.title') }}
      sx={{ bg: '#153CDB', pb: 0 }}
      disableScrollView={Platform.OS === 'web'}
      hideHeader={isDesktop}
    >
      <SolitoImage
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/background.png`}
        width={width}
        height={600}
        contentFit="cover"
        contentPosition="bottom center"
        alt=""
        style={{ position: 'absolute', bottom: 0, zIndex: 0 }}
      />
      <ScrollView
        contentContainerSx={{
          pb: 180,
          minHeight: height - 100,
        }}
      >
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/arch-${pathname
            .split('/')
            .pop()}.png`}
          width={width}
          height={width * (524 / 1920)}
          contentPosition="top center"
          alt=""
          style={{ position: 'absolute', zIndex: 0 }}
        />
        {children}
      </ScrollView>
    </PageWithBackHeader>
  )
}

export default EuroBackground
