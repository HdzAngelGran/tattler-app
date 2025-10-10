import TattlerError from './tattlerError.js'

const errorHandler = (error, req, res, next) => {
  console.error(error.name, ':', error.message)

  if (error instanceof TattlerError)
    return res.status(error.code).json({ message: error.message })

  return res.status(500).json({ message: 'An internal server error occurred.' })
}

export default errorHandler
