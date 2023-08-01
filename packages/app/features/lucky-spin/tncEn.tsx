import { useResponsiveValue } from 'dripsy'
import React from 'react'

const TncEn = () => {
  const isDesktop = useResponsiveValue([false, false, false, true])
  return (
    <div>
      {isDesktop && <h2>TERMS & CONDITIONS</h2>}
      <p>WELCOME SPIN</p>

      <br />
      <div>
        <strong>How To Redeem</strong>
        <br />
      </div>

      <ol>
        <li>Apply to ALL first time registered member in APP only</li>
        <li>Same IP and devices registered before are not entitled</li>
        <li>
          Member who qualified for free spin will see the pop up Lucky Wheel
          instantly after registered
        </li>
      </ol>

      <br />

      <div>
        <strong>Free Spin Prizes</strong>
      </div>
      <ol>
        <li>
          All goods will be delivered to the eligible member within 3 weeks
          after receive private message from our customer service
        </li>
        <li>
          All cash prizes will be credited to player's wallet within same day
        </li>
        <li>Cash prize is subject to 25x rollover before the withdrawal</li>
        <li>A minimum deposit of VND50k must be done before the withdrawal</li>
      </ol>
      <br />

      <div>
        <strong>Terms & Conditions</strong>
      </div>
      <ol>
        <li>
          Vui123 reserves the right to amend or withdraw the event at any time
        </li>
        <li>
          Vui123 is the sole arbiter of the event and its decision is final
        </li>
        <li>Vui123 Standards Terms & Conditions apply</li>
      </ol>
    </div>
  )
}

export default TncEn
