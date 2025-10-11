import jwt from 'jsonwebtoken'

const { JWT_SECRET, JWL_EXPIRES_IN } = process.env

export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWL_EXPIRES_IN,
  })
}

export const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

export const verifyToken = (token) => {
  if (!token) throw new TattlerError(401, 'Token is required')
  const decoded = decodeToken(token)
  if (!decoded) throw new TattlerError(401, 'Invalid token')
  return decoded
}

export const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
    const decoded = verifyToken(token)
    req.body.createdBy = decoded.id
    next()
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

export default protect
