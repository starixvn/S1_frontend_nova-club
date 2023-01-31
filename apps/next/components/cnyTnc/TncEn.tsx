import React from 'react'
import Cat from 'app/assets/images/events/cny/zodiac/cat.png'

const TncEn = () => {
  return (
    <div>
      <h2>CNY LUCKY CAT SPIN</h2>
      <p>Campaign Period: 20 January 2023 - 15 February 2023</p>

      <br />
      <div>
        <strong>HOW TO PLAY</strong>
        <br />
      </div>

      <ol>
        <li>Apply to ALL member</li>
        <li>
          Make a minimum deposit of VND50,000 to entitle for 1 free spin entry.
        </li>
        <li>
          You must deposit the minimum amount on each transaction, not
          cumulative.
        </li>
        <li>
          The more (times) you deposit, the more you get the free spin tickets
        </li>
      </ol>

      <br />
      <strong>LUCKY SPIN PRIZES</strong>
      <ol>
        <li className="catList">
          1 x
          <img className="cat" src={Cat} alt="cat" />= VND38,000
        </li>
        <li className="catList">
          2 x <img className="cat" src={Cat} alt="cat" /> = VND388,000
        </li>
        <li className="catList">
          3 x <img className="cat" src={Cat} alt="cat" /> = VND3,888,000
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
