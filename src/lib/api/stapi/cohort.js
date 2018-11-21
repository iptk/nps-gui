import {InvalidArgumentException, BackendException} from '../exceptions'
import Entity from './entity'
import Participant from './participant'

class Cohort extends Entity{
  apipath = 'cohort'

  constructor({
    id, name, studyID, participantIDs, participants, plannedParticipantCount, study
  }={}){
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
    return super.get(id, (new Cohort()).apipath).then(json => new Cohort({
        id: json.cohort.id,
        name: json.cohort.name,
        studyID: json.cohort.studyID,
        study: (study && study.id == json.cohort.studyID) ?study :null,
        plannedParticipantCount: json.cohort.plannedParticipantCount,
        participantIDs: json.cohort.participants
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
    var parts = this.participantIDs.map(cid => Participant.get(cid, recursive, this))
    return Promise.all(parts).then(ps => {
      this.participants = ps.sort(
        (a,b) => a.alias.localeCompare(b.alias, {kn: true}, {sesitivity: 'base'})
      )
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
        this.id = json.cohort.id
        this.name = json.cohort.name
        this.studyID = json.cohort.studyID
        this.participantIDs = json.cohort.participants
        this.plannedParticipantCount = json.cohort.plannedParticipantCount

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
