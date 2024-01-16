import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import React from 'react'
import ErrorDisplays from './ErrorDisplays'

type Props = {}

export default function ForbiddenScreen({}: Props) {
  return (
    <ErrorDisplays
      iconProps={{
        src: `${MEDIA_DOMAIN}${CONTENT_URI}/ic_forbidden.png`,
        alt: 'Forbidden',
      }}
      title="BẠN KHÔNG CÓ QUYỀN TRUY CẬP"
      description={`Chúng tôi rất xin lỗi vì sự bất tiện này. \nVui lòng liên hệ bộ phận Hỗ trợ Khách hàng để được giúp đỡ. \nCám ơn quý khách đã thông cảm.`}
    />
  )
}
