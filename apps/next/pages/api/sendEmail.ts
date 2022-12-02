const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  const { name, email } = req.param
  const msg = {
    to: 'test@example.com',
    from: email,
    subject: 'Applying for VUI123 Agent',

    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  //ES6
  try {
    const resp = await sgMail.send(msg)
    console.log('email sent')

    res
      .status(200)
      .json({ status: 0, message: 'Successfully submitted your request' })
  } catch (e) {
    console.error(e)

    if (e?.response) {
      console.error(e?.response.body)
    }

    res.status(200).json({ status: 0, message: 'System Error' })
  }
}
