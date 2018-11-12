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
    this.cohorts.push(cohort)
    if(cohort.id){
      this.cohortIDs.push(cohort.id)
    }
  }

  static get(id, recursive){
    return super.get(id).then(json => new Study({
        id: json.study.id,
        name: json.study.name,
        cohortIDs: json.study.cohortIDs
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
    return super.save({name: this.name}).then(json => {
        this.id = json.study.id
        this.name = json.study.name
        this.cohortIDs = json.study.cohortIDs

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
        url: '/v4/stapi/study',
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

  getCohortByID(id){
    for(var c of this.cohorts){
      if(c.id == id){
        return c
      }
    }
    return null
  }
  getCohortByName(name){
    for(var c of this.cohorts){
      if(c.name == name){
        return c
      }
    }
    return null
  }
  getCohortByIDorName(id, name){
    for(var c of this.cohorts){
      if(c.id == id || c.name == name){
        return c
      }
    }
    return null
  }
}

export default Study
export {Study}
