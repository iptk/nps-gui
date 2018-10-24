import Entity from './entity'

class Dataset extends Entity{
  apipath = 'dataset'

  constructor({id, datasetID, participant, participantID, dateID}){
    super()
    this.id = id
    this.datasetID = datasetID
    this.participant = participant || null
    this.participantID = participantID
    this.dateID = dateID
  }

  static get(id, recursive, participant){
    super.get(id).then(json => new Dataset({
      id: json.id,
      datasetID: json.dataset_id,
      participant: (participant && participant.id == json.participant_id)
        ?participant :null,
      participantID: json.participant_id,
      dateID: json.date_id
    }))
  }

  save(recursive=true){
    return super.save({name: this.name}).then(json => {
        this.id = json.id
        this.datasetID = json.dataset_id
        this.participantID = json.participant_id
        this.dateID = json.date_id

        if(recursive){
          return Promise.all(this.cohorts.map(c => c.save(true)))
        }

        return this
      })
      .then(n => this)
  }
}

export default Dataset
export {Dataset}
