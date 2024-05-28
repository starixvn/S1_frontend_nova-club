import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import React from 'react'
const src1 = `${MEDIA_DOMAIN}${CONTENT_URI}/info/shareholder-th-1.png`

const ShareholderTh = () => {
  return (
    <div>
      <p>
        <strong>ผู้ถือหุ้นสร้างรายได้อย่างไร</strong>
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
        <li>ผู้ถือหุ้นจะได้รับ PT มากถึง 85% จากท็อปไลน์</li>
        <li>ผู้ถือหุ้น รับสมัครผู้ถือหุ้นไม่จำกัด</li>
        <li>ผู้ถือหุ้นรับสมัครตัวแทนเงินสดและเครดิตไม่จำกัดจำนวน</li>
        <li>ผู้ถือหุ้นจะได้รับค่าคอมมิชชั่นตาม PT และผลประกอบการของกลุ่ม</li>
        <li>ยิ่งคุณรับสมัครมากเท่าไร คุณก็ยิ่งได้รับมากขึ้นเท่านั้น!</li>
      </ol>
    </div>
  )
}

export default ShareholderTh
