import React from 'react'
import BonusTableRow from './BonusTableRow'

const HalloweenTncEn = () => {
  return (
    <div>
      <h2>HORROR PUMPKIN</h2>
      <p>Campaign Period: 01-31/10/2023</p>

      <br />
      <div>
        <strong>HOW TO PLAY</strong>
        <br />
      </div>

      <ol>
        <li>One (1) ticket will be given for every VND 1,000,000 deposit.</li>
        <li>Tickets can be used to play the game and win the prizes.</li>
        <li>Tap the SPIN button to start the game. </li>
        <li>The SPIN button will automatically spin until tickets run out.</li>
        <li>Tickets will be deducted for every new spin.</li>
        <li>Number of pumpkins that appear is your prize.</li>
      </ol>

      <br />
      <div>
        <strong>BONUS TABLE</strong>
        <br />
        <BonusTableRow multiplier={1} value={'100K'} />
        <BonusTableRow multiplier={2} value={'200K'} />
        <BonusTableRow multiplier={3} value={'1,000K'} />
      </div>

      <br />

      <div>
        <strong>TERMS & CONDITIONS</strong>
      </div>
      <ol>
        <li>This Campaign is open for ALL Vui123’s players.</li>
        <li>All cash prizes will be credited to player's wallet</li>
        <li>All cash prizes are subject to 1x rollover condition</li>
        <li>
          All tickets must be claimed within the campaign period. Unclaimed
          tickets will be forfeited after the campaign ends.
        </li>
        <li>
          Vui123 reserves the right to amend or withdraw the event at any time
        </li>
        <li>
          Vui123 is the sole arbiter of the event and its decision is final
        </li>
        <li>Vui123 Standards Terms & Condition apply</li>
      </ol>
    </div>
  )
}

export default HalloweenTncEn
