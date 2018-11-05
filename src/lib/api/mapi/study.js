import {InvalidArgumentException, BackendException} from '../exceptions'
import Entity from './entity'

class Study extends Entity{
  apipath = 'study'

  constructor({id=null, name="", cohortIDs=[], cohorts=[]}){
    super()
    this.id = id
    this.name = name
    this.cohortIDs = []
    this.cohorts = cohorts || []
  }

  addCohort(cohort){
    if(this.id){
      cohort.studyID = this.id
    }
    cohort.study = this
    if(cohort.id){
      this.cohortIDs.push(cohort.id)
      this.cohorts.push(cohort)
    }
  }

  static get(id, recursive){
    return super.get(id).then(json => new Study({
        id: resp.json.id,
        name: resp.json.name,
        cohortIDs: resp.json.cohorts
      }))
      .then(s => {
        if(recursive){
          return s.loadCohorts(recursive)
        }
        return s
      })
  }

  loadCohorts(recursive=true){
    if(!this.id){
      return Promise.resolve(this)
    }
    var cohorts = s.cohortIDs.map(cid => Cohort.get(id, recursive))
    return Promise.all(cohorts).then(cs => {
      this.cohorts = cs
      return this
    })
  }

  save(recursive=true){
    super.save({name: this.name}).then(json => {
        this.id = resp.json.id
        this.name = resp.json.name
        this.cohortIDs = resp.json.cohorts

        if(recursive){
          return Promise.all(this.cohorts.map(c => {
            c.studyID = this.id
            return c.save(true)
          }))
        }

        return this
      })
      .then(n => {
        return this
      })
  }

  static search({filter, limit, offset}){
    return (new Request({
        url: '/v4/mapi/study',
        method: 'GET',
        data: {
          filter: filter,
          limit: limit,
          offset: offset
        }
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode != 200){
          throw new BackendException({msg: 'Cannot find studies', data: resp})
        }
        resp.json.studies.map(s => new Study({
          id: s.id,
          name: s.name,
          cohortIDs: s.cohorts
        }))
      })
  }
}

export default Study
export {Study}
