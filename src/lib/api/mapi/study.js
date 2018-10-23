class Study{
  constructor({id, name, cohorts}){
    this.id = id
    this.name = name
    this.cohorts = cohorts || []
  }
}

export default Study
export {Study}
