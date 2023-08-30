import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { MENU_HEIGHT } from 'desktop-ext/components/tab/DesktopTabBar'
import { Row, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'

const paymentMethod = [
  `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/bitcoin.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/tether.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/eeziepay.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/help2pay.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/momo.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/mobifone.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/vietel.png`,
  `${MEDIA_DOMAIN}${CONTENT_URI}/v2/payment-provider/vinaphone.png`,
]

const Channel = () => {
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        my: '$3',
        mx: ['8%', , , , '10%'],
      }}
    >
      {paymentMethod.map((p, i) => {
        return (
          <>
            {p && (
              <View key={i} sx={{ width: 100, height: 50, mx: '$3', my: '$2' }}>
                <div
                  className="footer-provider-img"
                  style={{ width: '100%', height: '100%' }}
                >
                  <SolitoImage
                    fill
                    alt={'payment-method'}
                    contentFit="contain"
                    src={p}
                  />
                </div>
              </View>
            )}
          </>
        )
      })}
      {/* <View sx={{ width: 100, height: 50, mx: '$3', my: '$2' }}>
        <div
          className="footer-provider-img"
          style={{ width: '100%', height: '100%' }}
        >
          <SolitoImage
            fill
            alt={'g'}
            contentFit="contain"
            src={require('../../../assets/images/eeziepay.png')}
          />
        </div>
      </View> */}
    </Row>
  )
}

export const LogoImage = ({ src }) => {
  return <SolitoImage fill contentFit="contain" src={src} alt="" />
}

export default Channel
