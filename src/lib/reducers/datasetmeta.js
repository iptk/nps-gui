import {
  ADD_EMPTY_METADATASET,
  RECEIVE_DATASET,
  METADATA_SAVED
} from '../actions/datasetmeta'

import {MetaDataset} from '../api'

const init = {
  dataset: {
    metadatasets: [],
    files: []
  },
  downloadurl: undefined,
  filesbaseurl: "#"
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

    default:
      return state
  }
}

export default reducer
