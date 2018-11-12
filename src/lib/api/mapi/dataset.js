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
      id: json.dataset.id,
      datasetID: json.dataset.datasetID,
      participant: (participant && participant.id == json.dataset.participantID)
        ?participant :null,
      participantID: json.dataset.participantID,
      dateID: json.dataset.dateID
    }))
  }

  save(recursive=true){
    return super.save({name: this.name}).then(json => {
        this.id = json.dataset.id
        this.datasetID = json.dataset.datasetID
        this.participantID = json.dataset.participantID
        this.dateID = json.dataset.dateID

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
