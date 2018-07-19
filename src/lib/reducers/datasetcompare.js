import {
  ADD_EMPTY_METADATASET,
  RECEIVE_DATASET,
  METADATA_SAVED
} from '../actions/datasetcompare'

import {MetaDataset} from '../api'

const init = {
  dataset: {
    metadatasets: [],
    files: []
  }
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return {
        ...state,
        dataset: action.result
      }

    default:
      return state
  }
}

export default reducer
