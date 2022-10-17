import { NextApiRequest, NextApiResponse } from 'next'

const getForbidden = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(403).setHeader('content-type', 'application/json').json({
      code: 1003,
      message: 'forbidden',
      success: false,
    })
  } catch (error) {
    console.error('return forbidden from here', error)
  }
}

export default getForbidden
