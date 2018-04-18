import {Request} from './request'
import {KeyValueMetadata} from './metadata'
import {
  BackendException,
  ExecutionException,
  InvalidArgumentException
} from './exceptions'

class MetaDataset{
  constructor({dataset_id = "", id="", metadata = []}){
    this.dataset_id = dataset_id
    this.id = id
    this.metadata = metadata
  }

  static getAliases(){
    return (new Request({
        url: '/v2/metadata/aliases',
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
        url: '/v2/datasets/'+dataset_id+'/meta/'+id,
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
    var meta = Object.keys(metadata).map((key) => (
      new KeyValueMetadata(key, metadata[key])
    ))
    return new MetaDataset({
      dataset_id: (metadata_key ?json.dataset_id :null) || dataset_id || "",
      id: (metadata_key ?json.id :null) || id || "",
      metadata: meta
    })
  }

  getMetadata(key = null){
    if(key === null){
      return this.metadata
    }
    for(var m of this.metadata){
      if(m.key == key){
        return m
      }
    }
    return null
  }

  save(){
    if(!this.dataset_id){
      throw new ExecutionException({msg: "dataset_id is not defined"})
    }
    var metadata = {}
    for(var m of this.metadata){
      metadata[m.key] = m.value
    }
    return (new Request({
        url: '/v2/datasets/'+this.dataset_id+'/meta/save',
        method: 'POST',
        data: {
          id: this.id,
          metadata: metadata
        }
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode == 200){
          this.id = resp.json.id
          var meta = Object.keys(resp.json.metadata).map(
            (val) => new KeyValueMetadata(
              val, resp.json.metadata[val]
            )
          )
          this.metadata = meta
          return this
        }
        throw new BackendException({
          msg: "Cannot save metadataset "+this.id+" in dataset "+this.dataset_id,
          data: resp
        })
      })
  }
}

class SpecialMetaDatasets{
  static async getJobs(offset, count){
    var url = '/v2/jobs'
    if(offset){
      url += '/'+offset
      if(count){
        url += '/'+count
      }
    }
    return await MetaDataset.getMetadataList({
      url: url, key: 'jobs'
    })
  }
}

export {MetaDataset, SpecialMetaDatasets}
export default MetaDataset
