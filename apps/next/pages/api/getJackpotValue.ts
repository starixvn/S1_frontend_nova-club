import * as htmlparser2 from 'htmlparser2'
import { NextApiRequest } from 'next'

export const config = {
  runtime: 'experimental-edge',
}

const getJackpotValue = async (req: NextApiRequest) => {
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

    return new Response(
      JSON.stringify({
        code: 0,
        data: {
          increment,
          jackpotAmount,
        },
        message: '',
        success: true,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error(error)

    return new Response(
      JSON.stringify({
        code: 1000,
        message: 'Unable to retrieve jackpot value',
        success: false,
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  }
}

export default getJackpotValue
