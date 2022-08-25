import * as htmlparser2 from 'htmlparser2'
import { NextApiRequest, NextApiResponse } from 'next'

const getJackpotValue = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let increment = '0'
    let jackpotAmount = '0'

    const remoteUrl = `https://tickers.playtech.com/jackpots/new_jackpotxml.php?currency=vnd&info=4&casino=hotspin88am`

    const response = await fetch(remoteUrl)
    const responseXmlText = await response.text()

    const dom = htmlparser2.parseDocument(responseXmlText)

    if (dom) {
      // @ts-ignore
      const amountDom = dom.lastChild?.lastChild?.lastChild?.lastChild
      if (amountDom) {
        const { step } = amountDom.attribs
        increment = step

        const amountTextNode = amountDom.lastChild
        if (amountTextNode) {
          const jackpotTotalAmount = amountTextNode.data

          jackpotAmount = jackpotTotalAmount || '0'
        }
      }
    }

    res.status(200).setHeader('content-type', 'application/json').json({
      code: 0,
      data: {
        increment,
        jackpotAmount,
      },
      message: '',
      success: true,
    })
  } catch (error) {
    console.error(error)

    res.status(400).setHeader('content-type', 'application/json').json({
      code: 1000,
      message: 'Unable to retrieve jackpot value',
      success: false,
    })
  }
}

export default getJackpotValue
