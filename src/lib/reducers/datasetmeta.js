import {
  START_LOADING,
  RECEIVE_DATASET
} from '../actions/datasetmeta'

const init = {
  dataset: {
    metadatasets: []
  },
  "downloadurl": "#"
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return {
        ...state,
        dataset: action.result,
        downloadurl: action.result.getDownloadURL()
      }

    default:
      return state
  }
}

export default reducer
