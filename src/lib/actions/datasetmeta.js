import {Dataset, MetaDataset} from '../api'

const RECEIVE_DATASET = 'RECEIVE_DATASET',
  START_LOADING = 'START_LOADING',
  RECEIVE_ALIASES = 'RECEIVE_ALIASES',
  ALIASES_SAVED = 'ALIASES_SAVED',
  METADATA_SAVED = 'METADATA_SAVED',
  TAGS_SAVED = 'TAGS_SAVED',
  TAGS_SAVED_SNACKBAR_TIMEOUT = 'TAGS_SAVED_SNACKBAR_TIMEOUT'

const deleteMetadata = (dataset, metaid) => {
  return (dispatch) => {
    dataset.deleteMetaDataset(metaid)
      .then(succ => dispatch({type: RECEIVE_DATASET, result: dataset}))
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

const saveMetadata = (metaset) => {
  return (dispatch) => {
    metaset.save()
      .then(meta => dispatch({type: METADATA_SAVED, metadataset: meta}))
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

export {
  deleteMetadata,
  fetchDataset,
  fetchMetadataAliases,
  saveMetadata,
  saveTags,
  START_LOADING,
  RECEIVE_DATASET,
  RECEIVE_ALIASES,
  ALIASES_SAVED,
  TAGS_SAVED,
  TAGS_SAVED_SNACKBAR_TIMEOUT
}
