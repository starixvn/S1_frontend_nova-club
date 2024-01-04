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
        <strong>CHRISTMAS GIVEAWAY</strong>
        <br />
      </div>
      <p>Campaign Period: 25/12/2023 (12.00am, 10.00am, 8.00pm)</p>

      <br />
      <div>
        <strong>How To Redeem</strong>
        <br />
      </div>

      <ol>
        <li>
          Vui123 is having Christmas Giveaway to all existing members on above
          time slots.
        </li>
        <li>The giveaway is first come first served basis.</li>
        <li>Members will see the pop up surprise instantly after login.</li>
        <li>Vui Coin will be credited to player's wallet after redeem.</li>
        <li>Player can use the Vui Coin at MY REWARDS HUB.</li>
        <li>
          Bonus in MY REWARDS HUB is subject to 1x rollover before the
          withdrawal.
        </li>
        <li>
          Vui123 reserves the right to amend or withdraw the event at any time.
        </li>
        <li>
          Vui123 is the sole arbiter of the event and its decision is final.
        </li>
        <li>Vui123 Standards Terms & Conditions apply.</li>
      </ol>
    </div>
  )
}

export default TncEn
