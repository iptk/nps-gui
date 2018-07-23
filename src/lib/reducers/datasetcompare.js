import {
  RECEIVE_DATASETS,
  UPDATE_SELECTED_MIDS
} from '../actions/datasetcompare'

import {MetaDataset} from '../api'

const init = {
  datasets: [],
  selectedMids: []
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_DATASETS:
      return {
        ...state,
        datasets: action.result
      }

    case UPDATE_SELECTED_MIDS:
      return {
        ...state,
        selectedMids: action.mids
      }

    default:
      return state
  }
}

export default reducer
