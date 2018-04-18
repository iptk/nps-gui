import {SpecialMetaDatasets} from '../api'

const RECEIVE_PENDING_JOBS = 'RECEIVE_PENDING_JOBS',
  RECEIVE_SCHEDULED_JOBS = 'RECEIVE_SCHEDULED_JOBS'

const fetchPendingJobs = () => {
  return (dispatch) => {
    SpecialMetaDatasets
      .getJobs()
      .then(jobs => dispatch({type: RECEIVE_PENDING_JOBS, jobs: jobs}))
  }
}

const fetchScheduledJobs = () => {
  return (dispatch) => {
    SpecialMetaDatasets
      .getJobs(-20)
      .then(jobs => dispatch({type: RECEIVE_SCHEDULED_JOBS, jobs: jobs}))
  }
}

export {
  RECEIVE_PENDING_JOBS,
  RECEIVE_SCHEDULED_JOBS,
  fetchPendingJobs,
  fetchScheduledJobs
}
