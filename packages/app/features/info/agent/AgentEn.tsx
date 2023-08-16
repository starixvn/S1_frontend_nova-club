import React from 'react'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
const src1 = `${MEDIA_DOMAIN}${CONTENT_URI}/info/agent-en.png`

const AgentEn = () => {
  return (
    <div>
      <p>
        <strong>How Agent make money</strong>
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
        <li>Agent enjoy up to 0.5% rebate commission.</li>
        <li>Agent commission is based on player's turnover</li>
        <li>Agent recruit player is unlimited</li>
        <li>The more you recruit, the more you earn!</li>
      </ol>
    </div>
  )
}

export default AgentEn
