import Entity from './entity'
import Dataset from './dataset'
import MDate from './date'

class Participant extends Entity{
  apipath = 'participant'

  constructor({id, alias, cohort, cohortID, datasetIDs, dateIDs, datasets, dates}={}){
    super()
    this.id = id
    this.alias = alias || ''
    this.cohort = cohort || null
    this.cohortID = cohortID
    this.datasetIDs = datasetIDs || []
    this.dateIDs = dateIDs || []
    this.datasets = datasets || []
    this.dates = dates || []
  }

  static get(id, recursive, cohort){
    return super.get(id, (new Participant()).apipath).then(json => new Participant({
          id: json.participant.id,
          alias: json.participant.alias,
          cohortID: json.participant.cohortID,
          datasetIDs: json.participant.datasetIDs,
          dateIDs: json.participant.dateIDs,
          cohort: (cohort && cohort.id == json.participant.cohortID) ?cohort :null
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
    return super.save({alias: this.alias, cohortID: this.cohortID}).then(json => {
        this.id = json.participant.id
        this.alias = json.participant.alias
        this.cohortID = json.participant.cohortID
        this.datasetIDs = json.participant.datasetIDs
        this.dateIDs = json.participant.dateIDs

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
