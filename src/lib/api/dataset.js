import {Request} from './request'
import {KeyValueMetadata} from './metadata'

class Dataset{
  constructor({index="", type="", id="", metadata = []}){
    this.metadata = []
  }

  static search(filters){
    if(Array.isArray(filters)){
      // TODO: Exception
    }
    if(filters.length > 0 && !Array.isArray(filters)){
      filters = [filters]
    }
    var resp = (new Request({
        url: '/v2/datasets/search',
        method: 'POST',
        data: {'filters': filters}
      })).fetch()
    console.log(resp)
    if(resp.statuscode == 200){
      //iterate over datasets
      var rows = []
      for(var res in resp.json['results']){
        var ds = []
        for(var ds in res['datasets']){
          var meta = []
          for(var m in ds['_source']){
            meta.push(KeyValueMetadata(m.key, m.value))
          }
          ds.push({
            'score': ds['_score'],
            'dataset': Dataset(meta)
          })
        }
        row.push({
          'total': res['total'],
          'datasets': ds
        })
      }
      return rows
    }
    else{
      return []
    }
  }

  getMetadata(key = null){
    if(key === null){
      return this.metadata
    }
    for(var m in this.metadata){
      if(m.key == key){
        return m
      }
    }
  }
}

export {Dataset}
export default Dataset
