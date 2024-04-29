import React from 'react'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
const src1 = `${MEDIA_DOMAIN}${CONTENT_URI}/info/agent-th.png`

const AgentTh = () => {
  return (
    <div>
      <p>
        <strong>เอเย่นต์ทำเงินอย่างไร</strong>
      </p>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <img
          src={src1}
          style={{ width: '50%', height: '30%', minWidth: '350px' }}
        />
      </div>

      <ol>
        <li>เอเย่นต์สามารถเพลิดเพลินกับคอมมิชชันคืนเงินสูงสุดถึง 0.5%</li>
        <li>คอมมิชชันของเอเย่นต์ขึ้นอยู่กับยอดการเล่นของผู้เล่น</li>
        <li>เอเย่นต์สามารถสรรหาผู้เล่นได้โดยไม่จำกัด</li>
        <li>ยิ่งคุณสร้างกลุ่มใหม่มากขึ้น, ยิ่งได้รับรายได้มากขึ้น!</li>
      </ol>
    </div>
  )
}

export default AgentTh
