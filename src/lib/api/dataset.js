import {Request} from './request'

class Dataset{
  private metadata = []

  constructor(metadata = []){
    this.metadata = []
  }

  static byFilter(keywords){
    resp = (new Request('/v2/dataset/filter', keywords)).fetch()
    if(resp.statuscode == 200){
      //iterate over datasets
    }
  }
}

export {Dataset}
export default Dataset
