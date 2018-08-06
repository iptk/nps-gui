import {Dataset} from '../api'
import {G_START_LOADING, G_STOP_LOADING} from './_common'
import {NotificationLevel, notifyUser} from '../util/notification'

const RECEIVE_DATASET = 'RECEIVE_DATASET',
  ALIASES_SAVED = 'ALIASES_SAVED',
  METADATA_SAVED = 'METADATA_SAVED',
  ADD_EMPTY_METADATASET = 'ADD_EMPTY_METADATASET'

const deleteMetadata = (dataset, metaid) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    if(isNewSet){
      dataset.removeMetaDataset('__empty')
      dataset.metadatasets = {...dataset.metadatasets}
      dispatch({type: RECEIVE_DATASET, result: dataset})
      dispatch({type: G_STOP_LOADING})
    }
    else{
      dataset.deleteMetaDataset(metaid)
        .then(succ => {
          dataset.metadatasets = {...dataset.metadatasets}
          dispatch({type: RECEIVE_DATASET, result: dataset})
          notifyUser(dispatch,{
            message: "datasetmeta.succ.deletemeta",
            level: NotificationLevel.SUCCESS
          })
        })
        .catch(err => {
          notifyUser(dispatch, {
            message: "datasetmeta.err.deletemeta",
            level: NotificationLevel.ERROR
          })
        })
        .finally(() => {
          dispatch({type: G_STOP_LOADING})
        })
    }
  }
}

const fetchDataset = (id) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    Dataset.getByID(id)
      .then(ds => {
        dispatch({type: RECEIVE_DATASET, result: ds})
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "common.err.fetchsingleds",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })

  }
}

const saveMetadata = (metaset) => {
  return (dispatch) => {
    dispatch({type: G_START_LOADING})
    metaset.save()
      .then(meta => {
        dispatch({
          type: METADATA_SAVED, metadataset: meta, isNewSet: isNewSet
        })
        notifyUser(dispatch, {
          message: "datasetmeta.succ.savemeta",
          level: NotificationLevel.SUCCESS
        })
      })
      .catch(err => {
        notifyUser(dispatch, {
          message: "datasetmeta.err.savemeta",
          level: NotificationLevel.ERROR
        })
      })
      .finally(() => {
        dispatch({type: G_STOP_LOADING})
      })
  }
}

export {
  deleteMetadata,
  fetchDataset,
  saveMetadata,
  ADD_EMPTY_METADATASET,
  RECEIVE_DATASET,
  ALIASES_SAVED,
  METADATA_SAVED
}
