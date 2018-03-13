import {Request} from './request'
import {KeyValueMetadata} from './metadata'
import {MetaDataset} from './metadataset'
import {NPS} from './NPS'

class Dataset{
  constructor({index="", type="", id="", metadata = [], metadatasets = [], tags = []}){
    this.index = index
    this.type = type
    this.id = id
    this.metadata = metadata
    this.metadatasets = metadatasets
    this.tags = tags
  }

  static async getByID(id){
    if(!id){
      // TODO: Exception
    }

    // fetch tags
    var tags = (new Request({
        url: '/v2/datasets/'+id+'/tags',
        method: 'GET'
      }))
      .fetch()
      .then(async resp => {
        if(resp.statuscode == 200){
          return resp.json.tags
        }
        return []
      })

    // fetch metadatasets
    var metadatasets = (new Request({
        url: '/v2/datasets/'+id+'/meta',
        method: 'GET'
      }))
      .fetch()
      .then(async resp => {
        if(resp.statuscode == 200){
          var metads = []
          resp.json.metadatasets.forEach((elem) => {
            metads.push(MetaDataset.getByID(id, elem))
          })
          metads = await Promise.all(metads)
          return metads
        }
      })

    // create dataset
    var ds = new Dataset({
      id: id,
      metadatasets: await metadatasets,
      tags: await tags
    })
    console.log('______________-')
    console.log(ds)
    return ds
  }

  static search(filters){
    if(Array.isArray(filters)){
      // TODO: Exception
    }
    if(filters.length > 0 && !Array.isArray(filters)){
      filters = [filters]
    }
    return (new Request({
        url: '/v2/datasets/search',
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
    return NPS.server+'/v2/datasets/'+this.id+'.zip'
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
}

export {Dataset}
export default Dataset
