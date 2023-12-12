import useIsDesktop from 'app/hooks/useIsDesktop'
import useTncHandler from 'app/hooks/useTncHandler'
import React from 'react'

const TncEn = () => {
  const isDesktop = useIsDesktop()

  useTncHandler()

  return (
    <div>
      {isDesktop && <h2>TERMS & CONDITIONS</h2>}

      <div>
        <strong>DAILY FREE SPINS GIVEAWAY</strong>
        <br />
      </div>
      <p>Campaign Period: 21/09-31/12/2023</p>

      <br />
      <div>
        <strong>How To Redeem</strong>
        <br />
      </div>

      <ol>
        <li>This promotion is exclusively for Vui123 existing members only.</li>
        <li>Free spins are given randomly everyday. </li>
        <li>
          Lucky members will see the pop up Lucky Spin instantly after login.
        </li>
      </ol>

      <br />

      <div>
        <strong>Terms & Conditions</strong>
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
        <li>
          Vui123 reserves the right to amend or withdraw the event at any time
        </li>
        <li>
          Vui123 is the sole arbiter of the event and its decision is final
        </li>
        <li>Vui123 Standards Terms & Conditions apply</li>
      </ol>
      <br />
    </div>
  )
}

export default TncEn
