import Entity from './entity'

class Date extends Entity{
  apipath = 'date'

  constructor({id, date, participant, participantID, datasetID}){
    super()
    this.id = id
    this.date = date
    this.participant = participant || null
    this.participantID = participantID
    this.datasetID = datasetID
  }

  static get(id, recursive, participant){
    super.get(id).then(json => new Dataset({
      id: json.id,
      datasetID: json.dataset_id,
      participant: (participant && participant.id == json.participant_id)
        ?participant :null,
      participantID: json.participant_id,
      date: json.date
    }))
  }

  save(recursive=true){
    return super.save({name: this.name}).then(json => {
        this.id = json.id
        this.datasetID = json.dataset_id
        this.participantID = json.participant_id
        this.date = json.date

        if(recursive){
          return Promise.all(this.cohorts.map(c => c.save(true)))
        }

        return this
      })
      .then(n => this)
  }
}

export default Date
export {Date}
