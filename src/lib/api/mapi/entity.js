import {InvalidArgumentException, BackendException} from '../exceptions'
import {Request} from '../request'

class Entity{
  apipath = ''

  clone(){
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  delete(){
    if(!this.id){
      return false
    }
    // Database is designed to cascade deletion
    return (new Request({
        url: `/v4/mapi/${this.apipath}/${this.id}`,
        method: 'DELETE'
      }))
      .fetch()
      .then(resp => (resp.statuscode == 200 && resp.json.success))
  }

  static get(id){
    return (new Request({
        url: `/v4/mapi/${this.apipath}/${id}`,
        method: 'GET'
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode != 200 || !resp.json.success){
          throw new InvalidArgumentException({
            msg: `${path} ${this.id} does not exist`,
            data: resp
          })
        }
        return resp.json
      })
  }

  save(data){
    var url = `/v4/mapi/${this.apipath}`
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
