import {InvalidArgumentException, BackendException} from '../exceptions'
import Entity from './entity'

class Cohort extends Entity{
  apipath = 'cohort'

  constructor({
    id, name, studyID, participantIDs, participants, plannedParticipantCount, study
  }){
    super()
    this.id = id
    this.name = name
    this.plannedParticipantCount = plannedParticipantCount || 0
    this.studyID = studyID
    this.study = study || null
    this.participantIDs = participantIDs || []
    this.participants = participants || []
  }

  static get(id, recursive, study=null){
    super.get(id).then(json => new Cohort({
        id: json.id,
        name: json.name,
        studyID: json.studyID,
        study: (study && study.id == json.studyID) ?study :null,
        plannedParticipantCount: json.plannedParticipantCount,
        participantIDs: json.participantIDs
      }))
      .then(c => {
        if(recursive){
          return c.loadParticipants(recursive)
        }
        return c
      })
  }

  addParticipant(participant){
    if(this.id){
      participant.cohortID = this.id
    }
    participant.cohort = this
    this.participants.push(participant)
    if(participant.id){
      this.participantIDs.push(participant.id)
    }
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
    super.save({
        name: this.name,
        plannedParticipantCount: this.plannedParticipantCount,
        studyID: this.studyID
      })
      .then(json => {
        this.id = json.id
        this.name = json.name
        this.studyID = json.studyID
        this.participantIDs = json.participants
        this.plannedParticipantCount = json.plannedParticipantCount

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
