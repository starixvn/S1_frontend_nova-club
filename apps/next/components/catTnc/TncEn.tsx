import React from 'react'
import Cat_0 from 'app/assets/images/events/summerCat/cat_0.png'
import Cat_38 from 'app/assets/images/events/summerCat/cat_88.png'
import Cat_388 from 'app/assets/images/events/summerCat/cat_388.png'
import Cat_3888 from 'app/assets/images/events/summerCat/cat_3888.png'

const TncEn = () => {
  return (
    <div>
      <h2>FORTUNE CAT MEOW</h2>
      <p>Campaign Period: 1 May - 30 June 2023</p>

      <br />
      <div>
        <strong>HOW TO PLAY</strong>
        <br />
      </div>

      <ol>
        <li>Apply to ALL member</li>
        <li>Make a minimum deposit of VND100,000 to entitle for 1 ticket.</li>
        <li>
          You must deposit the minimum amount on each transaction, not
          cumulative.
        </li>
        <li>
          The more (times) you deposit, the more you get the free spin tickets
        </li>
        <li>Tap the icon to reveal prizes.</li>
        <li>The first three similar symbols are your winning prizes.</li>
      </ol>

      <br />
      <strong>BONUS TABLE</strong>
      <ol>
        <li className="catList">
          <img className="cat" src={Cat_3888} alt="cat" /> = VND3,888k
        </li>
        <li className="catList">
          <img className="cat" src={Cat_388} alt="cat" /> = VND388k
        </li>
        <li className="catList">
          <img className="cat" src={Cat_38} alt="cat" />= VND38k
        </li>
        <li className="catList">
          <img className="cat" src={Cat_0} alt="cat" />= VND0k
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

export default TncEn
