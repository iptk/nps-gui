import {InvalidArgumentException} from './exceptions'
import {Request} from './request'
import {KeyValueMetadata} from './metadata'
import {MetaDataset} from './metadataset'
import {NPS} from './NPS'

class Dataset{
  constructor({
    id = "",
    index = "",
    files = "",
    metadata = [],
    metadatasets = {},
    tags = [],
    type = []
  }){
    this.id = id
    this.index = index
    this.files = files
    this.metadata = metadata
    this.metadatasets = metadatasets
    this.tags = tags
    this.type = type
  }

  async awaitPromises(){
    this.metadatasets = await Promise.resolve(this.metadatasets)
    this.tags = await Promise.resolve(this.tags)
    this.data = await Promise.resolve(this.data)
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
    return (new Request({
        url: '/v3/datasets/search',
        method: 'POST',
        data: {'filters': filters}
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode == 200){
          //iterate over datasets
          var rows = []
          for(var res of resp.json['results']){
            var datasets = []
            for(var ds of res['datasets']){
              var meta = []
              Object.keys(ds._source)
                .forEach(key => {
                  meta.push(new KeyValueMetadata(key, ds._source[key]))
                })
              datasets.push({
                'score': ds['_score'],
                'dataset': new Dataset({
                  index: ds['_index'],
                  type: ds['_type'],
                  id: ds['_id'],
                  metadata: meta
                })
              })
            }
            rows.push({
              'total': res['total'],
              'datasets': datasets
            })
          }
          return rows
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
