import React from 'react'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
const src1 = `${MEDIA_DOMAIN}${CONTENT_URI}/info/shareholder-en-1.png`
const src2 = `${MEDIA_DOMAIN}${CONTENT_URI}/info/shareholder-en-2.png`
import Image from 'next/image'

const ShareholderEn = () => {
  return (
    <div>
      <p>
        <strong>How Shareholder Make Money</strong>
      </p>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <img
          src={src1}
          style={{ width: '100%', height: '30%', minWidth: '350px' }}
        />
        <img
          src={src2}
          style={{ width: '50%', height: '30%', maxWidth: '350px' }}
        />
      </div>
      <ol>
        <li>Shareholder enjoy up to 85% PT from topline</li>
        <li>Shareholder recruit shareholder is unlimited</li>
        <li>Shareholder recruit cash & credit agent is unlimited</li>
        <li>
          Shareholder earn the commission based on the PT and their group
          turnover{' '}
        </li>
        <li>The more you recruit, the more you earn!</li>
      </ol>
    </div>
  )
}

export default ShareholderEn
