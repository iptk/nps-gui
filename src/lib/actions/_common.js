import {MetaDataset} from '../api/metadataset'

const G_START_LOADING = 'G_START_LOADING',
  G_STOP_LOADING = 'G_STOP_LOADING',
  G_ADD_DATASETS_TO_COMPARISON = 'G_ADD_DATASET_TO_COMPARISON',
  G_RECEIVE_METADATA_ALIASES = 'G_RECEIVE_METADATA_ALIASES',
  G_REMOVE_DATASETS_FROM_COMPARISON = 'G_REMOVE_DATASET_FROM_COMPARISON',
  G_RESTORE_STATE_FROM_COOKIES = 'G_RESTORE_STATE_FROM_COOKIES'

const gFetchMetadataAliases = () => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    MetaDataset.getAliases()
      .then(aliases => {
        dispatch({type: G_RECEIVE_METADATA_ALIASES, aliases: aliases})
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })
  }
}

export {
  G_START_LOADING,
  G_STOP_LOADING,

  G_ADD_DATASETS_TO_COMPARISON,
  G_RECEIVE_METADATA_ALIASES,
  G_REMOVE_DATASETS_FROM_COMPARISON,
  G_RESTORE_STATE_FROM_COOKIES,

  gFetchMetadataAliases
}
