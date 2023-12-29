import useIsDesktop from 'app/hooks/useIsDesktop'
import useTncHandler from 'app/hooks/useTncHandler'
import React from 'react'

const TncEn = () => {
  const isDesktop = useIsDesktop()

  useTncHandler()

  return (
    <div>
      {isDesktop && <h2>TERMS & CONDITIONS</h2>}
      <p>WELCOME REWARDS</p>

      <br />
      <div>
        <strong>How To Participate</strong>
        <br />
      </div>

      <ol>
        <li>Apply to ALL first time registered member</li>
        <li>Same IP and devices registered before are not entitled</li>
        <li>
          Members who qualified for FREE DICE will see a pop up instantly after
          registered.
        </li>
        <li>Press "START" to roll the dice. </li>
        <li>
          The number of moves is calculated based on the results of 2 dice,
          clockwise with step 1 start from Vui123 logo.
        </li>
        <li>The prize corresponds to the position where you have landed on.</li>
        <li>When you land on "?", you have chance to win secret rewards.</li>
      </ol>

      <br />

      <div>
        <strong>Terms & Conditions</strong>
      </div>
      <ol>
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
    </div>
  )
}

export default TncEn
