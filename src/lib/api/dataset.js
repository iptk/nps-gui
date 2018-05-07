import {InvalidArgumentException} from './exceptions'
import {Request} from './request'
import {KeyValueMetadata} from './metadata'
import {MetaDataset} from './metadataset'
import {NPS} from './NPS'

class Dataset{
  constructor({
    id = "",
    files = "",
    metadata = [],
    metadatasets = {},
    tags = []
  }){
    this.id = id
    this.files = files
    this.metadata = metadata
    this.metadatasets = metadatasets
    this.tags = tags
  }

  async awaitPromises(){
    this.metadatasets = await Promise.resolve(this.metadatasets)
    this.tags = await Promise.resolve(this.tags)
    this.data = await Promise.resolve(this.data)
  }

  static fetchTags(id){
    return []
  }

  static fetchMetadatasets(id){
    return (new Request({
        url: '/v3/datasets/'+id+'/meta',
        method: 'GET'
      }))
      .fetch()
      .then(async resp => {
        if(resp.statuscode == 200){
          var metads = []
          var metadict = {}
          // TODO: find a cheaper way
          resp.json.metadatasets.forEach((elem) => {
            metads.push(MetaDataset.getByID(id, elem))
          })
          metads = await Promise.all(metads)
          metads.forEach((elem) => {
            metadict[elem.id] = elem
          })
          return metadict
        }
      })
  }

  static fetchData(id){
    return (new Request({
        url: '/v3/datasets/'+id+'/data',
        method: 'GET'
      }))
      .fetch()
      .then(async resp => {
        if(resp.statuscode == 200){
          return resp.json.files
        }
        return []
      })
  }

  static async getByID(id, usePromises=false){
    if(!id){
      throw new InvalidArgumentException({msg: "ID is not set"})
    }

    // fetch tags
    var tags = this.fetchTags(id)

    // fetch metadatasets
    var metadatasets = this.fetchMetadatasets(id)

    // fetch files
    var data = this.fetchData(id)

    // create dataset
    var ds = new Dataset({
      id: id,
      metadatasets: usePromises ?metadatasets :await metadatasets,
      tags: usePromises ?tags :await tags,
      files: usePromises ?data :await data
    })
    return ds
  }

  static search(filters){
    if(!Array.isArray(filters)){
      throw new InvalidArgumentException({
        msg: "filters is not an array",
        data: filters
      })
    }
    if(filters.length > 0 && !Array.isArray(filters)){
      filters = [filters]
    }
    filters = filters.map((elem) => '('+elem.join(',')+')').join(' OR ')
    return (new Request({
        url: '/v3/datasets/search?q='+encodeURIComponent(filters),
        method: 'GET'
      }))
      .fetch()
      .then(async resp => {
        if(resp.statuscode == 200 && resp.json.success){
          var datasets = await Promise.all(resp.json.datasets.map((ds) =>
            (Dataset.getByID(ds.id))
          ))
          return datasets
        }
        else{
          return []
        }
      })
  }

  getDownloadURL(){
    return NPS.getServer().uri+'/v3/datasets/'+this.id+'.zip'
  }

  getDataDownloadBaseURL(){
    return NPS.getServer().uri+'/v3/datasets/'+this.id+"/data/"
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

  async save(){
    var [tags, meta] = await (new Request({
        url: '/v3/datasets/'+this.id+'/tags',
        method: 'POST',
        data: {'tags': this.tags}
      }))
      .fetch()
      .then(resp => [
        this.constructor.fetchTags(this.id),
        // as the tags are part of the metadata, we need to reload metadata, too
        this.constructor.fetchMetadatasets(this.id)
      ])
    this.tags = await tags
    this.metadatasets = await meta
    return this
  }

  updateMetaDataset(meta){
    this.metadatasets[meta.id] = meta
    return this
  }

  async deleteMetaDataset(metaid){
    if(metaid in this.metadatasets){
      return (await new Request({
          url: '/v2/datasets/'+this.id+'/meta/'+metaid,
          method: 'Delete'
        }))
        .fetch()
        .then(resp => {
          if(resp.json.success){
            delete this.metadatasets[metaid]
            return true
          }
          return false
        })
    }
    return false
  }

  removeMetaDataset(metaid){
    if(metaid in this.metadatasets){
      delete this.metadatasets[metaid]
    }
  }
}

export {Dataset}
export default Dataset
