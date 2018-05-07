import {
  ADD_EMPTY_METADATASET,
  START_LOADING,
  RECEIVE_DATASET,
  RECEIVE_ALIASES,
  METADATA_SAVED,
  TAGS_SAVED,
  TAGS_SAVED_SNACKBAR_TIMEOUT
} from '../actions/datasetmeta'

import {MetaDataset} from '../api'

const init = {
  maliases: {
    aliases: {}
  },
  dataset: {
    metadatasets: [],
    tags: [],
    files: []
  },
  downloadurl: undefined,
  filesbaseurl: "#",
  tagsSavedSnackbar: false
}
const reducer = (state = init, action) => {
  switch(action.type){
    case ADD_EMPTY_METADATASET:
      var ds = state.dataset
      ds.metadatasets = {
        "__empty": new MetaDataset({dataset_id: state.dataset.id}),
        ...state.dataset.metadatasets
      }
      return {
        ...state,
        dataset: ds
      }

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

    case METADATA_SAVED:
      var ds = state.dataset.updateMetaDataset(action.metadataset)
      if(action.isNewSet){
        ds.removeMetaDataset('__empty')
      }
      state.dataset.metadatasets = {...state.dataset.metadatasets}
      return {
        ...state,
        dataset: ds
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
