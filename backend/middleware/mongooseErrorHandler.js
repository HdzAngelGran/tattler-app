import TattlerError from './tattlerError.js'

const mongooseErrorHandler = (uniqueErrorMessage) => (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const specificError = new TattlerError(409, uniqueErrorMessage)
    next(specificError)
  } else if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors)
      .map((val) => val.message)
      .join(', ')

    const specificError = new TattlerError(
      400,
      messages.includes('ObjectId') ? 'Invalid ID format' : messages
    )
    next(specificError)
  } else next(new TattlerError(500, 'Internal Server Error'))
}

export default mongooseErrorHandler
