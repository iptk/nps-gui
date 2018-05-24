const crypto = require('crypto')

const generateID = (len=40) => {
  var bytes = len/2 + len%2
  var id = crypto.randomBytes(bytes).toString('hex')
  return id.substr(len)
}

export {generateID}
