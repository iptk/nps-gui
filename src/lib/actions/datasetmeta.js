import {Dataset, MetaDataset} from '../api'

const RECEIVE_DATASET = 'RECEIVE_DATASET',
  START_LOADING = 'START_LOADING',
  RECEIVE_ALIASES = 'RECEIVE_ALIASES',
  ALIASES_SAVED = 'ALIASES_SAVED',
  METADATA_SAVED = 'METADATA_SAVED',
  ADD_EMPTY_METADATASET = 'ADD_EMPTY_METADATASET'

const deleteMetadata = (dataset, metaid, isNewSet) => {
  return (dispatch) => {
    if(isNewSet){
      dataset.removeMetaDataset('__empty')
      dataset.metadatasets = {...dataset.metadatasets}
      dispatch({type: RECEIVE_DATASET, result: dataset})
    }
    else{
      dataset.deleteMetaDataset(metaid)
        .then(succ => {
          dataset.metadatasets = {...dataset.metadatasets}
          dispatch({type: RECEIVE_DATASET, result: dataset})
        })
    }
  }
}

const fetchDataset = (id) => {
  return (dispatch) => {
    dispatch({type: START_LOADING})
    Dataset.getByID(id)
      .then(ds => dispatch({type: RECEIVE_DATASET, result: ds}))

  }
}

const fetchMetadataAliases = () => {
  return (dispatch) => {
    MetaDataset.getAliases()
      .then(aliases => dispatch({type: RECEIVE_ALIASES, aliases: aliases}))
  }
}

const saveMetadata = (metaset, isNewSet) => {
  return (dispatch) => {
    metaset.save()
      .then(meta => dispatch({
          type: METADATA_SAVED, metadataset: meta, isNewSet: isNewSet
      }))
  }
}

export {
  deleteMetadata,
  fetchDataset,
  fetchMetadataAliases,
  saveMetadata,
  ADD_EMPTY_METADATASET,
  START_LOADING,
  RECEIVE_DATASET,
  RECEIVE_ALIASES,
  ALIASES_SAVED,
  METADATA_SAVED
}
