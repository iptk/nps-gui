import {
  ADD_EMPTY_METADATASET,
  RECEIVE_DATASET,
  RECEIVE_RELATED_DATASETS,
  METADATA_SAVED
} from '../../actions/dsapi/datasetmeta'

import {G_RESTORE_LOCAL_STORE_DEFAULTS} from '../../actions/_common'

import {MetaDataset} from '../../api/dsapi'

const init = {
  dataset: {
    metadatasets: [],
    files: []
  },
  downloadurl: undefined,
  filesbaseurl: "#",
  related: []
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

    case RECEIVE_RELATED_DATASETS:
      return {
        ...state,
        related: action.dsids
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

    case G_RESTORE_LOCAL_STORE_DEFAULTS:
      return {
        ...init
      }

    default:
      return state
  }
}

export default reducer
