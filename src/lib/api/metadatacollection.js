import {BackendException} from './exceptions'
import {Request} from './request'

class MetadataCollection{
  constructor({
    description = "",
    generator = {
      image: "",
      command: ""
    },
    identifier = "",
    name = "",
    version = 0
  }){
    this.description = description
    this.generator = generator
    this.id = identifier
    this.name = name
    this.version = version
  }

  static fetchAll(){
    return (new Request({
        url: '/v2/metadata/collections',
        method: 'GET'
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode == 200){
          return {
            total: resp.json.total,
            collections: resp.json.collections.map((coll) => (
              new MetadataCollection(coll)
            ))
          }
        }
        throw new BackendException({
          msg: "Cannot load collections",
          data: resp
        })
      })
  }
}

export default MetadataCollection
export {MetadataCollection}
