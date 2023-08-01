import React from 'react'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
const src1 = `${MEDIA_DOMAIN}${CONTENT_URI}/info/agent-vi.png`

const AgentVi = () => {
  return (
    <div>
      <p>
        <strong>Cách tính lợi nhuận cho đại lý</strong>
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
        <li>Đại lý được hưởng đến 0.5% hoa hồng hoàn trả.</li>
        <li>Hoa hồng đại lý được tính trên doanh thu cược của người chơi.</li>
        <li>Đại lý được mời người chơi không giới hạn.</li>
        <li>Mời càng nhiều, túi tiền càng to!</li>
      </ol>
    </div>
  )
}

export default AgentVi
