import {
  RECEIVE_PENDING_JOBS,
  RECEIVE_SCHEDULED_JOBS
} from '../actions/jobsoverview'

const init = {
  jobs_pending: [],
  jobs_scheduled: []
}

const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_PENDING_JOBS:
      return {
        ...state,
        jobs_pending: action.jobs
      }

    case RECEIVE_SCHEDULED_JOBS:
      return {
        ...state,
        jobs_scheduled: action.jobs
      }

    default:
      return state
  }
}

export default reducer
