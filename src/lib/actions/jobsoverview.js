import {SpecialMetaDatasets} from '../api'

const RECEIVE_JOBS = 'RECEIVE_JOBS'

const fetchJobs = () => {
  return (dispatch) => {
    SpecialMetaDatasets
      .getJobs()
      .then(jobs => dispatch({type: RECEIVE_JOBS, jobs: jobs}))
  }
}

export {RECEIVE_JOBS, fetchJobs}
