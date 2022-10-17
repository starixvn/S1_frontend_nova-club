import { NextApiRequest, NextApiResponse } from 'next'

const getMaintenance = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(404).setHeader('content-type', 'application/json').json({
      code: 1004,
      message: 'maintenance',
      success: false,
    })
  } catch (error) {
    console.error('return maintenance from here', error)
  }
}

export default getMaintenance
