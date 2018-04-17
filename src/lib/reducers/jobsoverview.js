import {RECEIVE_JOBS} from '../actions/jobsoverview'

const init = {
  jobs: []
}

const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_JOBS:
      console.log(action)
      return {
        ...state,
        jobs: action.jobs
      }

    default:
      return state
  }
}

export default reducer
