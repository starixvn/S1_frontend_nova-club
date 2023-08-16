import React from 'react'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
const src1 = `${MEDIA_DOMAIN}${CONTENT_URI}/info/shareholder-vi-1.png`
const src2 = `${MEDIA_DOMAIN}${CONTENT_URI}/info/shareholder-vi-2.png`

const ShareholderVi = () => {
  return (
    <div>
      <p>
        <strong>Cách tính lợi nhuận cho cổ đông</strong>
      </p>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <img
          src={src1}
          style={{ width: '100%', height: '30%', minWidth: '350px' }}
        />
        {/* <img
          src={src2}
          style={{ width: '50%', height: '30%', maxWidth: '350px' }}
        /> */}
      </div>
      <ol>
        <li>Cổ đông được hưởng đến 85% lợi nhuận từ nhà cái</li>
        <li>Cổ đông được mời thêm cổ đông không giới hạn</li>
        <li>Cổ đông được mời đại lý trả trước và trả sau không giới hạn</li>
        <li>
          Cổ đông kiếm hoa hồng dựa trên lợi nhuận và doanh thu cược của thành
          viên nhóm
        </li>
        <li>Nhóm càng lớn, tiền càng nhiều!</li>
      </ol>
    </div>
  )
}

export default ShareholderVi
