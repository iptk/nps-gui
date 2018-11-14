import {InvalidArgumentException, BackendException} from '../exceptions'
import {Request} from '../request'

class Entity{
  apipath = ''

  static _getApipath(cls){
    return (new cls()).apipath
  }

  clone(){
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  delete(){
    if(!this.id){
      return false
    }
    // Database is designed to cascade deletion
    return (new Request({
        url: `/v4/stapi/${this.apipath}/${this.id}`,
        method: 'DELETE'
      }))
      .fetch()
      .then(resp => (resp.statuscode == 200 && resp.json.success))
  }

  static get(id, apipath){
    return (new Request({
        url: `/v4/stapi/${apipath}/${id}`,
        method: 'GET'
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode != 200 || !resp.json.success){
          throw new InvalidArgumentException({
            msg: `${apipath} ${id} does not exist`,
            data: resp
          })
        }
        return resp.json
      })
  }

  save(data){
    var url = `/v4/stapi/${this.apipath}`
    if(this.id){
      url += `/${this.id}`
    }
    return (new Request({
        url: url,
        method: 'POST',
        data: data
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode != 200 || !resp.json.success){
          throw new BackendException({
            msg: "Cannot save Study",
            data: resp
          })
        }
        return resp.json
      })
  }
}

export default Entity
export {Entity}
