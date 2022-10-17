import Image from 'app/components/common/Image'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { View } from 'dripsy'
import React from 'react'
import ResponseContent from './ResponseContent'

const LOGO_IMAGE = require('../../assets/images/logo.png')
const ICON = require('../../assets/images/ic_forbidden.png')

const Forbidden = () => {
  return (
    <PageWithBackHeader header={{ title: 'Forbidden' }} hideHeader>
      <View
        sx={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20%',
        }}
      >
        <Image
          source={LOGO_IMAGE}
          style={{ height: 100, width: '100%' }}
          resizeMode="contain"
        />
        <ResponseContent
          icon={ICON}
          title="ACCESS RESTRICTED"
          subtitle="The page that you are trying to access has been restricted in this location."
          content={`We apologize for the inconvenience. \nPlease contact customer support for more details. \nThank you for your utmost understanding.`}
        />
        <ResponseContent
          icon={ICON}
          title="BẠN KHÔNG CÓ QUYỀN TRUY CẬP"
          subtitle="Trang web này hiện đang bị hạn chế truy cập tại vị trí của bạn."
          content={`Chúng tôi rất xin lỗi vì sự bất tiện này. \nVui lòng liên hệ bộ phận Hỗ trợ Khách hàng để được giúp đỡ. \nCám ơn quý khách đã thông cảm.`}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default Forbidden
