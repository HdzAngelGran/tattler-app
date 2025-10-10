class TattlerError extends Error {
  constructor(code, message) {
    super(message)

    this.code = code
    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }
}

export default TattlerError
