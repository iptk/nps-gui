import {
  START_LOADING,
  RECEIVE_DATASET,
  RECEIVE_ALIASES,
  TAGS_SAVED,
  TAGS_SAVED_SNACKBAR_TIMEOUT
} from '../actions/datasetmeta'

const init = {
  maliases: {
    aliases: {}
  },
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

    case RECEIVE_ALIASES:
      return {
        ...state,
        maliases: action.aliases
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
