import {
  START_LOADING,
  RECEIVE_DATASET,
  TAGS_SAVED,
  TAGS_SAVED_SNACKBAR_TIMEOUT
} from '../actions/datasetmeta'

const init = {
  dataset: {
    metadatasets: [],
    tags: [],
    files: []
  },
  downloadurl: "#",
  filesbaseurl: "#",
  tagsSavedSnackbar: false
}
const reducer = (state = init, action) => {
  switch(action.type){
    case RECEIVE_DATASET:
      return {
        ...state,
        dataset: action.result,
        downloadurl: action.result.getDownloadURL(),
        filesbaseurl: action.result.getDataDownloadBaseURL()
      }

    case TAGS_SAVED:
      return {
        ...state,
        dataset: action.dataset,
        tagsSavedSnackbar: true
      }

    case TAGS_SAVED_SNACKBAR_TIMEOUT:
      return {
        ...state,
        tagsSavedSnackbar: false
      }

    default:
      return state
  }
}

export default reducer
