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
      id: json.date.id,
      datasetID: json.date.datasetID,
      participant: (participant && participant.id == json.date.participantID)
        ?participant :null,
      participantID: json.date.participantID,
      date: json.date.date
    }))
  }

  save(recursive=true){
    return super.save({name: this.name}).then(json => {
        this.id = json.date.id
        this.datasetID = json.date.datasetID
        this.participantID = json.date.participantID
        this.date = json.date.date

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
