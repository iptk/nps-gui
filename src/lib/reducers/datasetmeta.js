import {
  START_LOADING,
  RECEIVE_DATASET
} from '../actions/datasetmeta'

const init = {
  dataset: null
}
const reducer = (state = initFilter, action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return {...state, ds: action.result}

    default:
      return state
  }
}

export default reducer
