class Cohort{
  constructor({id, name, studyID, participantIDs}){
    this.id = id
    this.name = name
    this.studyID = studyID
    this.participantIDs = participantIDs || []
  }
}

export default Cohort
export {Cohort}
