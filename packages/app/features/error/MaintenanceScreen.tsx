import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Image from 'app/components/common/Image'
import { Row, ScrollView, Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import LiveChatButton from '../floatingContent/component/LiveChatButton'
import ErrorDisplays from './ErrorDisplays'

type Props = {}

export default function MaintenanceScreen({}: Props) {
  return (
    <ErrorDisplays
      iconProps={{
        src: require('app/assets/images/ic_maintenance.png'),
        alt: 'Maintenance',
      }}
      title={'HỆ THỐNG ĐANG BẢO TRÌ'}
      description={` Quý khách hàng thân mến, 
      Hệ thống của chúng tôi hiện đang bảo trì để nâng cấp trải nghiệm cho quý khách. Vui lòng truy cập lại sau. 
      Sự kiên nhẫn, thông cảm, và ủng hộ của quý khách là món quà quý giá với chúng tôi.`}
    />
  )
}
