import {InvalidArgumentException, BackendException} from '../exceptions'
import {Request} from '../request'
import Cohort from './cohort'
import Entity from './entity'

class Study extends Entity{
  apipath = 'study'

  constructor({id=null, name="", cohortIDs=[], cohorts=[]}={}){
    super()
    this.id = id
    this.name = name
    this.cohortIDs = cohortIDs || []
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
    return super.get(id, (new Study()).apipath).then(json => new Study({
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
    var cohorts = this.cohortIDs.map(cid => Cohort.get(cid, recursive, this))
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
    const addparam = (url, param, value) => {
      if(value && param){
        var delimiter = url.includes('?') ?'&' :'?'
        url += delimiter+encodeURIComponent(param)+'='+encodeURIComponent(value)
      }
      return url
    }
    var url = addparam('/v4/stapi/study', 'filter', filter)
    url = addparam(url, 'limit', limit)
    url = addparam(url, 'offset', offset)

    return (new Request({
        url: url,
        method: 'GET'
      }))
      .fetch()
      .then(resp => {
        if(resp.statuscode != 200){
          throw new BackendException({msg: 'Cannot find studies', data: resp})
        }
        return {
          studies: resp.json.studies.map(s => new Study({
            id: s.id,
            name: s.name,
            cohortIDs: s.cohorts
          })),
          range: resp.json.range
        }
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
