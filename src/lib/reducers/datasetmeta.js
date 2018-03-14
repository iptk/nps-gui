import {
  START_LOADING,
  RECEIVE_DATASET,
  TAGS_SAVED
} from '../actions/datasetmeta'

const init = {
  dataset: {
    metadatasets: [],
    tags: []
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

    case TAGS_SAVED:
      return {
        ...state,
        dataset: {
          ...state.dataset,
          tags: action.tags
        }
      }

    default:
      return state
  }
}

export default reducer
