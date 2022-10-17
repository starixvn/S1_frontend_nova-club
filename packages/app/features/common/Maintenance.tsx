import Image from 'app/components/common/Image'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { View } from 'dripsy'
import React from 'react'
import ResponseContent from './ResponseContent'

const LOGO_IMAGE = require('../../assets/images/logo.png')
const ICON = require('../../assets/images/ic_maintenance.png')

const Maintenance = () => {
  return (
    <PageWithBackHeader
      header={{ title: 'Maintenance' }}
      disableScrollView
      hideHeader
    >
      <View
        sx={{
          flex: 1,
          paddingTop: '40%',
          alignItems: 'center',
        }}
      >
        <Image
          source={LOGO_IMAGE}
          style={{ height: 100, width: '100%' }}
          resizeMode="contain"
        />
        <ResponseContent
          icon={ICON}
          title="HỆ THỐNG ĐANG BẢO TRÌ"
          subtitle="Trang web hiện không truy cập được do bảo trì"
          content={`Quý khách hàng thân mến,
Hệ thống của chúng tôi hiện đang bảo trì đểnâng cấp trải nghiệm cho quý khách. Vui lòng truy cập lại sau.
Sự kiên nhẫn, thông cảm, và ủng hộ của quý khách là món quà quý giá với chúng tôi.`}
        />
      </View>
    </PageWithBackHeader>
  )
}

export default Maintenance
