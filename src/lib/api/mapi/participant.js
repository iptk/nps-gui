class Participant{
  constructor({id, alias, cohortID, datasetIDs, dateIDs}){
    this.id = id
    this.alias = alias
    this.cohortID = cohortID
    this.datasetIDs = datasetIDs
    this.dateIDs = dateIDs
  }
}

export default Participant
export {Participant}
