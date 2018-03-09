import {
  START_LOADING,
  RECEIVE_DATASET
} from '../actions/datasetmeta'

const init = {
  dataset: {
    metadatasets: []
  }
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return {...state, ds: action.result}

    default:
      return state
  }
}

export default reducer
