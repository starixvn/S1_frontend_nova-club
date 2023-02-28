import React from 'react'
import Gold from 'app/assets/images/events/spinMania/multiplier/gold.png'
import Green from 'app/assets/images/events/spinMania/multiplier/green.png'
import Red from 'app/assets/images/events/spinMania/multiplier/red.png'

const TncEn = () => {
  return (
    <div>
      <h2>Daily Spin Mania</h2>
      <p>Campaign Period: 1 - 31 March 2023</p>

      <br />
      <div>
        <strong>HOW TO PLAY</strong>
        <br />
      </div>

      <ol>
        <li>Apply to ALL member</li>
        <li>
          Make a minimum deposit of VND100,000 to entitle for 1 free spin entry.
        </li>
        <li>
          You must deposit the minimum amount on each transaction, not
          cumulative.
        </li>
        <li>
          The more (times) you deposit, the more you get the free spin tickets
        </li>
        <li>
          Vui123's symbol act as multipliers to double or triple up your
          winnings.
        </li>
        <li>
          Final payout is based on the amount shown multiply by the multiplier
          icon that you get from last reel
        </li>
      </ol>

      <br />
      <strong>LUCKY SPIN PRIZES</strong>
      <ol>
        <li className="catList">
          <img className="cat" src={Green} alt="vuix1" />= 1x Multiplier
        </li>
        <li className="catList">
          <img className="cat" src={Red} alt="vuix2" /> = 2x Multiplier
        </li>
        <li className="catList">
          <img className="cat" src={Gold} alt="vuix3" /> = 3x Multiplier
        </li>
      </ol>

      <br />
      <div>
        <strong>TERMS & CONDITIONS</strong>
      </div>
      <ol>
        <li>This Campaign is open for ALL Vui123’s players.</li>
        <li>All cash prizes will be credited to player's wallet</li>
        <li>All cash prizes are subject to 1x rollover condition</li>
        <li>
          All tickets must claim within campaign period. Unclaimed ticket will
          be forfeited after the campaign ends.
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

export default TncEn
