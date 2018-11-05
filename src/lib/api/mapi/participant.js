import Entity from './entity'
import Dataset from './dataset'
import MDate from './date'

class Participant extends Entity{
  apipath = 'participant'

  constructor({id, alias, cohort, cohortID, datasetIDs, dateIDs, datasets, dates}){
    super()
    this.id = id
    this.alias = alias
    this.cohort = cohort || null
    this.cohortID = cohortID
    this.datasetIDs = datasetIDs
    this.dateIDs = dateIDs
    this.datasets = datasets || []
    this.dates = dates || []
  }

  static get(id, recursive, cohort){
    return super.get(id).then(json => new Participant({
          id: json.id,
          alias: json.alias,
          cohortID: json.cohort_id,
          datasetIDs: json.dataset_ids,
          dateIDs: json.date_ids,
          cohort: (cohort && cohort.id == json.cohort_id) ?cohort :null
        })
      )
      .then(p => {
        if(recursive){
          return Promise.all(p.loadDatasets(), p.loadDates()).then(p => p[0])
        }
        return this
      })
  }

  loadDatasets(){
    if(!this.id){
      return Promise.resolve(this)
    }
    var datas = this.datasetIDs.map(id => Dataset.get(id))
    return Promise.all(datas).then(ds => {
      this.datasets = ds
      return this
    })
  }

  loadDates(){
    if(!this.id){
      return Promise.resolve(this)
    }
    var dates = this.dateIDs.map(id => MDate.get(id))
    return Promise.all(dates).then(ds => {
      this.dates = ds
      return this
    })
  }

  save(recursive=true){
    return super.save({name: this.name}).then(json => {
        this.id = json.id
        this.alias = json.alias
        this.cohortID = json.cohort_id
        this.datasetIDs = json.dataset_ids
        this.dateIDs = json.date_ids

        if(recursive){
          return Promise.all([
            Promise.all(this.dates.map(d => {
              d.participantID = this.id
              return d.save()
            })),
            Promise.all(this.datasets.map(d => {
              d.participantID = this.id
              return d.save()
            }))
          ])
        }

        return this
      })
      .then(n => this)
  }
}

export default Participant
export {Participant}
