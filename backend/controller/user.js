import { generateToken, verifyToken } from '../middleware/authHandler.js'
import TattlerError from '../middleware/tattlerError.js'
import sendEmail from '../utils/sendEmail.js'
import { User } from '../model/user.model.js'

class UserController {
  constructor() {
    this.model = User
  }

  #generateMagicLink = (loginToken) => {
    return `${process.env.FRONT_URL}/user/verify?token=${loginToken}`
  }

  #generateLoginMessage = (magicLink) => {
    return `
            <h1>Login to Your Account</h1>
            <p>Click the link below to log in. This link is valid for 10 minutes.</p>
            <a href="${magicLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Log In</a>
            <p>If you did not request this login, please ignore this email.</p>
        `
  }

  login = async (req, res) => {
    const { body } = req

    const user = !body?.name
      ? await this.model.findOne({ email: body?.email })
      : await this.model.create(body)

    if (!user) throw new TattlerError(404, 'User not found')

    const jwt = generateToken(user._id)
    const magicLink = this.#generateMagicLink(jwt)
    const message = this.#generateLoginMessage(magicLink)

    await sendEmail({
      email: user.email,
      subject: 'Your Login Link',
      html: message,
    })

    res.status(200).json({ message: 'Login link sent to your email' })
  }

  linkLogin = (req, res) => {
    const { token } = req.query
    verifyToken(token)
    res.status(200).json({ message: 'token verified' })
  }
}

export default UserController
