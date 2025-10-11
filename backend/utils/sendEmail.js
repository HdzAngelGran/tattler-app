import nodemailer from 'nodemailer'
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465 ? true : false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: 'Tattler App <noreply@tattler.com>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  }

  const info = await transporter.sendMail(mailOptions)
  console.log(info.messageId)
}

export default sendEmail
