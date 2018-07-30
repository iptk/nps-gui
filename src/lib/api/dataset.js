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
    metadatasets = {}
  }){
    this.id = id
    this.files = files
    this.metadata = metadata
    this.metadatasets = metadatasets
  }

  async awaitPromises(){
    this.metadatasets = await Promise.resolve(this.metadatasets)
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

    // fetch metadatasets
    var metadatasets = this.fetchMetadatasets(id)

    // fetch files
    var data = this.fetchData(id)

    // create dataset
    var ds = new Dataset({
      id: id,
      metadatasets: usePromises ?metadatasets :await metadatasets,
      files: usePromises ?data :await data
    })
    return ds
  }

  static search(filters, fields, start=0, count=10){
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
    var url = '/v3/datasets/search?q='+encodeURIComponent(filters)
    if(fields){
      url += '&fields='+encodeURIComponent(fields.join(','))
    }
    if(count){
      url += '&per_page='+encodeURIComponent(count)
    }
    if(start){
      url += '&start='+encodeURIComponent(start)
    }

    return (new Request({
        url: url,
        method: 'GET'
      }))
      .fetch()
      .then(async resp => {
        if(resp.statuscode == 200 && resp.json.success){
          var datasets = await Promise.all(resp.json.datasets.map(async (ds)=>{
            var datas = await Dataset.getByID(ds.id)
            var metadata = []
            for(var m in ds){
              if(m != 'id'){
                metadata.push(new KeyValueMetadata(m, ds[m]))
              }
            }
            datas.metadata = metadata
            return datas
          }))
          return {range: resp.json.range, datasets: datasets}
        }
        else{
          return {range: {start: 0, end: 0, max: 0}, datasets: []}
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
    // nothing to do here atm
    return this
  }

  updateMetaDataset(meta){
    this.metadatasets[meta.id] = meta
    return this
  }

  async deleteMetaDataset(metaid){
    if(metaid in this.metadatasets){
      return (await new Request({
          url: '/v3/datasets/'+this.id+'/meta/'+metaid,
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
