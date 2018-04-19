class Exception extends Error{
  constructor({msg="", code=0, ancestor=null, data=null}){
    super(msg)
    this.code = code
    this.ancestor = ancestor
    this.data = data
  }
}

class BackendException extends Exception{}
class ConfigurationException extends Exception{}
class ExecutionException extends Exception{}
class InvalidArgumentException extends Exception{}
class NetworkException extends Exception{}

export default Exception
export {
  Exception,
  BackendException,
  ConfigurationException,
  ExecutionException,
  InvalidArgumentException
}
