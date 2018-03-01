import {Request} from './request'
import {KeyValueMetadata} from './metadata'
import {MetaDataset} from './metadataset'

class Dataset{
  constructor({index="", type="", id="", metadata = [], metadatasets = []}){
    this.index = index
    this.type = type
    this.id = id
    this.metadata = metadata
    this.metadatasets = metadatasets
  }

  static getByID(id){
    if(!id){
      // TODO: Exception
    }
    return (new Request({
        url: '/v2/datasets/'+id+'/meta',
        method: 'GET'
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode == 200){
          var metads = []
          metads = resp.metadatasets.forEach((elem) => {
            return MetaDataset.getByID(id, elem)
          })
          return new Dataset({
            id: id,
            metadatasets: metads
          })
        }
      })
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
