import {Dataset, MetaDataset} from '../api'
import {START_LOADING, STOP_LOADING} from './_common'

const RECEIVE_DATASET = 'RECEIVE_DATASET',
  RECEIVE_ALIASES = 'RECEIVE_ALIASES',
  ALIASES_SAVED = 'ALIASES_SAVED',
  METADATA_SAVED = 'METADATA_SAVED',
  ADD_EMPTY_METADATASET = 'ADD_EMPTY_METADATASET'

const deleteMetadata = (dataset, metaid, isNewSet) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    if(isNewSet){
      dataset.removeMetaDataset('__empty')
      dataset.metadatasets = {...dataset.metadatasets}
      dispatch({type: RECEIVE_DATASET, result: dataset})
      dispatch({type: STOP_LOADING})
    }
    else{
      dataset.deleteMetaDataset(metaid)
        .then(succ => {
          dataset.metadatasets = {...dataset.metadatasets}
          dispatch({type: RECEIVE_DATASET, result: dataset})
          dispatch({type: STOP_LOADING})
        })
    }
  }
}

const fetchDataset = (id) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    Dataset.getByID(id)
      .then(ds => {
        dispatch({type: RECEIVE_DATASET, result: ds})
        dispatch({type: STOP_LOADING})
      })

  }
}

const fetchMetadataAliases = () => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    MetaDataset.getAliases()
      .then(aliases => {
        dispatch({type: RECEIVE_ALIASES, aliases: aliases})
        dispatch({type: STOP_LOADING})
      })
  }
}

const saveMetadata = (metaset, isNewSet) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    metaset.save()
      .then(meta => {
        dispatch({
          type: METADATA_SAVED, metadataset: meta, isNewSet: isNewSet
        })
        dispatch({type: STOP_LOADING})
      })
  }
}

export {
  deleteMetadata,
  fetchDataset,
  fetchMetadataAliases,
  saveMetadata,
  ADD_EMPTY_METADATASET,
  RECEIVE_DATASET,
  RECEIVE_ALIASES,
  ALIASES_SAVED,
  METADATA_SAVED
}
