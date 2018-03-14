import {
  RECEIVE_DATASET
} from '../actions/metadatacollections'

const init = {
  total: 0,
  collections: []
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return {
        ...state,
        ...action.result
      }

    default:
      return state
  }
}

export default reducer
