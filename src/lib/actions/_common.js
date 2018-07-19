import {MetaDataset} from '../api/metadataset'

const G_START_LOADING = 'G_START_LOADING',
  G_STOP_LOADING = 'G_STOP_LOADING',
  G_RECEIVE_METADATA_ALIASES = 'G_RECEIVE_METADATA_ALIASES'

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

  G_RECEIVE_METADATA_ALIASES,

  gFetchMetadataAliases
}
