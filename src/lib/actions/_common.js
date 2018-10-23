import {MetaDataset} from '../api/dsapi/metadataset'
import {NotificationLevel, notifyUser} from '../util/notification'

const G_START_LOADING = 'G_START_LOADING',
  G_STOP_LOADING = 'G_STOP_LOADING',
  G_ADD_DATASETS_TO_COMPARISON = 'G_ADD_DATASET_TO_COMPARISON',
  G_NOTIFICATION_ADD = 'G_NOTIFICATION_ADD',
  G_NOTIFICATION_CLOSE = 'G_NOTIFICATION_CLOSE',
  G_RECEIVE_METADATA_ALIASES = 'G_RECEIVE_METADATA_ALIASES',
  G_REMOVE_DATASETS_FROM_COMPARISON = 'G_REMOVE_DATASET_FROM_COMPARISON',
  G_RESTORE_STATE_FROM_COOKIES = 'G_RESTORE_STATE_FROM_COOKIES',
  G_RESTORE_GLOBAL_STORE_DEFAULTS = 'G_RESTORE_GLOBAL_STORE_DEFAULTS',
  G_RESTORE_LOCAL_STORE_DEFAULTS = 'G_RESTORE_LOCAL_STORE_DEFAULTS'

const gFetchMetadataAliases = () => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    MetaDataset.getAliases()
      .then(aliases => {
        dispatch({type: G_RECEIVE_METADATA_ALIASES, aliases: aliases})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "_common.fetchmeta",
          level: NotificationLevel.ERROR,
          needsTranslation: true
        })
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
  G_NOTIFICATION_ADD,
  G_NOTIFICATION_CLOSE,
  G_RECEIVE_METADATA_ALIASES,
  G_REMOVE_DATASETS_FROM_COMPARISON,
  G_RESTORE_STATE_FROM_COOKIES,
  G_RESTORE_GLOBAL_STORE_DEFAULTS,
  G_RESTORE_LOCAL_STORE_DEFAULTS,

  gFetchMetadataAliases
}
