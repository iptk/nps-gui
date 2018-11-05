import {InvalidArgumentException, BackendException} from '../exceptions'
import Entity from './entity'

class Cohort extends Entity{
  apipath = 'cohort'

  constructor({id, name, studyID, participantIDs, study}){
    super()
    this.id = id
    this.name = name
    this.studyID = studyID
    this.study = study || null
    this.participantIDs = participantIDs || []
  }

  static get(id, recursive, study=null){
    super.get(id).then(json => new Cohort({
        id: json.id,
        name: json.name,
        studyID: json.studyID,
        study: (study && study.id == json.studyID) ?study :null,
        participantIDs: json.participantIDs
      }))
      .then(c => {
        if(recursive){
          return c.loadParticipants(recursive)
        }
        return c
      })
  }

  loadParticipants(recursive=true){
    if(!this.id){
      return Promise.resolve(this)
    }
    var parts = s.participantIDs.map(cid => Participant.get(id, recursive))
    return Promise.all(parts).then(ps => {
      this.participants = ps
      return this
    })
  }

  save(recursive=true){
    super.save({name: this.name, studyID: this.studyID})
      .then(json => {
        this.id = json.id
        this.name = json.name
        this.studyID = json.studyID
        this.participantIDs = json.participants

        if(recursive){
          return Promise.all(this.participants.map(c => {
            c.cohortID = this.id
            return c.save(true)
          }))
        }

        return this
      })
      .then(n => this)
  }
}

export default Cohort
export {Cohort}
