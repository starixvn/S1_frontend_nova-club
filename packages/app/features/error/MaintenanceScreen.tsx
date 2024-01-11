import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import React from 'react'
import ErrorDisplays from './ErrorDisplays'

type Props = {}

export default function MaintenanceScreen({}: Props) {
  return (
    <ErrorDisplays
      iconProps={{
        src: `${MEDIA_DOMAIN}${CONTENT_URI}/ic_maintenance.png`,
        alt: 'Maintenance',
      }}
      title={'HỆ THỐNG ĐANG BẢO TRÌ'}
      description={` Quý khách hàng thân mến, 
      Hệ thống của chúng tôi hiện đang bảo trì để nâng cấp trải nghiệm cho quý khách. Vui lòng truy cập lại sau. 
      Sự kiên nhẫn, thông cảm, và ủng hộ của quý khách là món quà quý giá với chúng tôi.`}
    />
  )
}
