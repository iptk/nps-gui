import {Request} from './request'
import {KeyValueMetadata} from './metadata'
import {
  BackendException,
  ExecutionException,
  InvalidArgumentException
} from './exceptions'
import {generateID} from './util'

class MetaDataset{
  constructor({dataset_id = "", id="", metadata = []}){
    this.dataset_id = dataset_id
    this.id = id
    this.metadata = metadata
  }

  static getAliases(){
    // tmp until this function does exist again
    return new Promise(() => ({aliases: {}}))
    return (new Request({
        url: '/v3/metadata/aliases',
        method: 'GET'
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode == 200){
          return resp.json
        }
        return {aliases:{}}
      })
  }

  static getByID(dataset_id, id){
    if(!id){
      throw new InvalidArgumentException({msg: "id is not set"})
    }
    return (new Request({
        url: '/v3/datasets/'+dataset_id+'/meta/'+id,
        method: 'GET'
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode == 200){
          return this.jsonToMetadataset({
            id: id, dataset_id: dataset_id, json: resp.json
          })
        }
        throw new BackendException({
          msg: "Cannot fetch metadataset "+id+" in dataset "+dataset_id,
          data: resp
        })
      })
  }

  static getMetadataList({
    url, method="GET", data=null, // fetching-params
    key, dataset_id, metadata_id // interpreting-params
  }){
    return (new Request({
        url: url,
        method: method,
        data: data
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode == 200){
          var metasets = key ? resp.json[key] : resp.json
          metasets = metasets.map((metaset) => (
            this.jsonToMetadataset({
              id: metadata_id, dataset_id: dataset_id,
              json: metaset, metadata_key: "metadata"
            })
          ))
          return metasets
        }
        throw new BackendException({
          msg: "Cannot fetch metadatset-list from '"+url+"' with method "
            +method,
          data: resp
        })
      })
  }

  static jsonToMetadataset({id, dataset_id, json, metadata_key}){
    var metadata = metadata_key ?json[metadata_key] :json
    return new MetaDataset({
      dataset_id: (metadata_key ?json.dataset_id :null) || dataset_id || "",
      id: (metadata_key ?json.id :null) || id || "",
      metadata: metadata
    })
  }

  getMetadata(key = null){
    if(key === null){
      return this.metadata
    }
    return this.metadata[key]
  }

  save(){
    if(!this.dataset_id){
      throw new ExecutionException({msg: "dataset_id is not defined"})
    }

    // generate a random id
    if(!this.id){
      this.id = generateID(40)
    }
    return (new Request({
        url: '/v3/datasets/'+this.dataset_id+'/meta/'+this.id,
        method: 'POST',
        data: this.metadata
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode == 200){
          this.id = resp.json.id
          this.metadata = resp.json.metadata
          return this
        }
        throw new BackendException({
          msg: "Cannot save metadataset "+this.id+" in dataset "+this.dataset_id,
          data: resp
        })
      })
  }
}

export {MetaDataset}
export default MetaDataset
