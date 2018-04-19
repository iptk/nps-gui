import {Dataset, MetaDataset, SpecialMetaDatasets} from '../api'

const RECEIVE_DATASET = 'RECEIVE_DATASET',
  START_LOADING = 'START_LOADING',
  RECEIVE_ALIASES = 'RECEIVE_ALIASES',
  ALIASES_SAVED = 'ALIASES_SAVED',
  METADATA_SAVED = 'METADATA_SAVED',
  TAGS_SAVED = 'TAGS_SAVED',
  TAGS_SAVED_SNACKBAR_TIMEOUT = 'TAGS_SAVED_SNACKBAR_TIMEOUT',
  ADD_EMPTY_METADATASET = 'ADD_EMPTY_METADATASET',
  JOB_STARTED = 'JOB_STARTED'

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

const saveTags = (dataset, tags) => {
  return (dispatch) => {
    dataset.tags = tags
    dataset
      .save()
      .then(ds => dispatch({type: TAGS_SAVED, dataset: ds}))
  }
}

const startJob = (dataset_id) => {
  return (dispatch) => {
    SpecialMetaDatasets
      .startJob(dataset_id)
      .then(result => dispatch({type: JOB_STARTED, result: result}))
  }
}

export {
  deleteMetadata,
  fetchDataset,
  fetchMetadataAliases,
  saveMetadata,
  saveTags,
  startJob,
  ADD_EMPTY_METADATASET,
  START_LOADING,
  RECEIVE_DATASET,
  RECEIVE_ALIASES,
  ALIASES_SAVED,
  METADATA_SAVED,
  TAGS_SAVED,
  TAGS_SAVED_SNACKBAR_TIMEOUT,
  JOB_STARTED
}
