import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

const nodemailer = require('nodemailer')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ['PUT', 'POST'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })

    if (req.method === 'POST') {
      const { name, email, phone } = req.body
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'mail.gandi.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'business@vui123.net', // generated ethereal user
          pass: '!!Welcome123!!', // generated ethereal password
        },
      })

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'business@vui123.net', // sender address
        to: 'contact@vui123.net, mobile.beacora@gmail.com', // list of receivers
        subject: `New Agent Application (${email})`, // Subject line
        text: `Name : ${name}\nPhone : ${phone}\nEmail : ${email}`, // plain text body
      })

      console.log('Message sent: %s', info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      res
        .status(200)
        .json({ success: true, message: 'Đăng ký đã được ghi nhận' })
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } else {
      res.status(404)
    }
  } catch (e) {
    console.warn('Sending Email Error', e)
    res.status(500).json({
      success: false,
      message: 'Rất tiếc! Đã xảy ra lỗi, vui lòng thử lại.',
    })
  }
}
